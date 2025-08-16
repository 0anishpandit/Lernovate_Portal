const express = require("express")
const User = require("../models/User")
const authMiddleware = require("../middleware/auth")
const roleMiddleware = require("../middleware/role")

const router = express.Router()

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private (Super_Admin, Institutional_Admin)
router.get("/", authMiddleware, roleMiddleware(["Super_Admin", "Institutional_Admin"]), async (req, res) => {
  try {
    const users = await User.find({ isActive: true }).select("-password -refreshTokens").sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    })
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route   GET /api/users/roles
// @desc    Get all available roles
// @access  Private (Admin roles)
router.get(
  "/roles",
  authMiddleware,
  roleMiddleware(["Super_Admin", "Institutional_Admin", "Principal"]),
  async (req, res) => {
    try {
      const { ROLES } = require("../models/User")

      res.status(200).json({
        success: true,
        roles: ROLES,
      })
    } catch (error) {
      console.error("Get roles error:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  },
)

module.exports = router
