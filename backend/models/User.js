const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// Define all available roles
const ROLES = [
  "Super_Admin",
  "Institutional_Admin",
  "Principal",
  "Vice-Principal",
  "Hostel_Warden",
  "Hostel_Matron",
  "Librarian",
  "School_CoOrdinator",
  "Mentor",
  "Teaching_Staff",
  "Non-Teaching_Staff",
  "Parents/Guardian",
  "Students",
]

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ROLES,
        message: "Invalid role. Must be one of: " + ROLES.join(", "),
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    profileImage: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]+$/, "Please provide a valid phone number"],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    // Role-specific fields
    employeeId: {
      type: String,
      sparse: true, // Allows multiple null values
      unique: true,
    },
    studentId: {
      type: String,
      sparse: true,
      unique: true,
    },
    department: {
      type: String,
      trim: true,
    },
    joiningDate: {
      type: Date,
    },
    // Security fields
    refreshTokens: [
      {
        token: String,
        createdAt: {
          type: Date,
          default: Date.now,
          expires: 604800, // 7 days in seconds
        },
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
        delete ret.refreshTokens
        delete ret.passwordResetToken
        delete ret.passwordResetExpires
        delete ret.emailVerificationToken
        return ret
      },
    },
  },
)

// Indexes for better performance
userSchema.index({ email: 1 })
userSchema.index({ role: 1 })
userSchema.index({ employeeId: 1 })
userSchema.index({ studentId: 1 })
userSchema.index({ isActive: 1 })

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next()

  try {
    // Hash password with cost of 12
    const saltRounds = Number.parseInt(process.env.BCRYPT_ROUNDS) || 12
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
  } catch (error) {
    next(error)
  }
})

// Instance method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    throw new Error("Password comparison failed")
  }
}

// Instance method to get full name
userSchema.methods.getFullName = function () {
  return `${this.firstName} ${this.lastName}`
}

// Instance method to check if user has specific role
userSchema.methods.hasRole = function (role) {
  return this.role === role
}

// Instance method to check if user has any of the specified roles
userSchema.methods.hasAnyRole = function (roles) {
  return roles.includes(this.role)
}

// Static method to find users by role
userSchema.statics.findByRole = function (role) {
  return this.find({ role, isActive: true })
}

// Static method to get role-based dashboard URL
userSchema.statics.getDashboardUrl = (role) => {
  const dashboardMap = {
    Super_Admin: "/dashboard/superadmin",
    Institutional_Admin: "/dashboard/institution",
    Principal: "/dashboard/principal",
    "Vice-Principal": "/dashboard/viceprincipal",
    Hostel_Warden: "/dashboard/hostelwarden",
    Hostel_Matron: "/dashboard/hostelmatron",
    Librarian: "/dashboard/librarian",
    School_CoOrdinator: "/dashboard/schoolcoordinator",
    Mentor: "/dashboard/mentor",
    Teaching_Staff: "/dashboard/teachingstaff",
    "Non-Teaching_Staff": "/dashboard/nonteachingstaff",
    "Parents/Guardian": "/dashboard/parents",
    Students: "/dashboard/student",
  }

  return dashboardMap[role] || "/dashboard/unauthorized"
}

// Virtual for dashboard URL
userSchema.virtual("dashboardUrl").get(function () {
  return this.constructor.getDashboardUrl(this.role)
})

// Export the model
module.exports = mongoose.model("User", userSchema)

// Export roles for use in other files
module.exports.ROLES = ROLES
