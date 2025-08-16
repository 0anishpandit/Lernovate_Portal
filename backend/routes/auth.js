const express = require("express")
const User = require("../models/User")
const JWTUtils = require("../utils/jwt")
const { body, validationResult } = require("express-validator")

const router = express.Router()

// Validation middleware
const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
]

// @route   POST /api/auth/login
// @desc    Login user and return JWT in HttpOnly cookies
// @access  Public
router.post("/login", loginValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { email, password, rememberMe } = req.body

    // Find user by email
    const user = await User.findOne({ email, isActive: true })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Generate tokens
    const { accessToken, refreshToken } = JWTUtils.generateTokenPair(user)

    // Store refresh token in database
    user.refreshTokens.push({
      token: refreshToken,
      createdAt: new Date(),
    })

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Set HTTP-only cookies
    JWTUtils.setTokenCookies(res, accessToken, refreshToken)

    // Get dashboard URL for role
    const dashboardUrl = User.getDashboardUrl(user.role)

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        dashboardUrl,
      },
      dashboardUrl,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route   POST /api/auth/logout
// @desc    Logout user and clear cookies
// @access  Private
router.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.cookies

    if (refreshToken) {
      // Remove refresh token from database
      try {
        const decoded = JWTUtils.verifyRefreshToken(refreshToken)
        await User.findByIdAndUpdate(decoded.userId, {
          $pull: { refreshTokens: { token: refreshToken } },
        })
      } catch (error) {
        // Token might be invalid, but we still want to clear cookies
        console.log("Error removing refresh token:", error.message)
      }
    }

    // Clear cookies
    JWTUtils.clearTokenCookies(res)

    res.status(200).json({
      success: true,
      message: "Logout successful",
    })
  } catch (error) {
    console.error("Logout error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// @route   POST /api/auth/refresh
// @desc    Refresh access token using refresh token
// @access  Private
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not provided",
      })
    }

    // Verify refresh token
    const decoded = JWTUtils.verifyRefreshToken(refreshToken)

    // Find user and check if refresh token exists
    const user = await User.findById(decoded.userId)
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User not found or inactive",
      })
    }

    // Check if refresh token exists in database
    const tokenExists = user.refreshTokens.some((tokenObj) => tokenObj.token === refreshToken)
    if (!tokenExists) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      })
    }

    // Generate new token pair
    const { accessToken, refreshToken: newRefreshToken } = JWTUtils.generateTokenPair(user)

    // Replace old refresh token with new one
    user.refreshTokens = user.refreshTokens.filter((tokenObj) => tokenObj.token !== refreshToken)
    user.refreshTokens.push({
      token: newRefreshToken,
      createdAt: new Date(),
    })
    await user.save()

    // Set new cookies
    JWTUtils.setTokenCookies(res, accessToken, newRefreshToken)

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Token refresh error:", error)
    res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    })
  }
})

// @route   GET /api/auth/verify
// @desc    Verify current user from token
// @access  Private
router.get("/verify", async (req, res) => {
  try {
    const { accessToken } = req.cookies

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token not provided",
      })
    }

    // Verify access token
    const decoded = JWTUtils.verifyAccessToken(accessToken)

    // Find user
    const user = await User.findById(decoded.userId)
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User not found or inactive",
      })
    }

    // Get dashboard URL
    const dashboardUrl = User.getDashboardUrl(user.role)

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        dashboardUrl,
      },
      dashboardUrl,
    })
  } catch (error) {
    console.error("Token verification error:", error)
    res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    })
  }
})

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get("/me", async (req, res) => {
  try {
    const { accessToken } = req.cookies

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token not provided",
      })
    }

    const decoded = JWTUtils.verifyAccessToken(accessToken)
    const user = await User.findById(decoded.userId).select("-password -refreshTokens")

    if (!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Get user profile error:", error)
    res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    })
  }
})

module.exports = router
