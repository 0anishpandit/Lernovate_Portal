const { body, validationResult } = require("express-validator")

// Common validation rules
const validationRules = {
  email: body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),

  password: body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),

  name: (field) =>
    body(field)
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage(`${field} must be between 2 and 50 characters`)
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage(`${field} must contain only letters and spaces`),

  role: body("role")
    .isIn([
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
    ])
    .withMessage("Invalid role specified"),

  phoneNumber: body("phoneNumber")
    .optional()
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage("Please provide a valid phone number"),
}

// Validation middleware to handle errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    })
  }

  next()
}

// Pre-defined validation chains
const loginValidation = [validationRules.email, validationRules.password, handleValidationErrors]

const registerValidation = [
  validationRules.email,
  validationRules.password,
  validationRules.name("firstName"),
  validationRules.name("lastName"),
  validationRules.role,
  validationRules.phoneNumber,
  handleValidationErrors,
]

module.exports = {
  validationRules,
  handleValidationErrors,
  loginValidation,
  registerValidation,
}
