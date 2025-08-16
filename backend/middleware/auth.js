const JWTUtils = require("../utils/jwt")
const User = require("../models/User")

// Authentication middleware - verifies JWT token from HttpOnly cookies
const authMiddleware = async (req, res, next) => {
  try {
    // Get access token from HttpOnly cookie
    const { accessToken } = req.cookies

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
        code: "NO_TOKEN",
      })
    }

    // Verify the token
    const decoded = JWTUtils.verifyAccessToken(accessToken)

    // Find the user
    const user = await User.findById(decoded.userId).select("-password -refreshTokens")

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. User not found.",
        code: "USER_NOT_FOUND",
      })
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Access denied. User account is inactive.",
        code: "USER_INACTIVE",
      })
    }

    // Add user to request object
    req.user = user
    next()
  } catch (error) {
    console.error("Auth middleware error:", error)

    // Handle specific JWT errors
    if (error.message.includes("expired")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token has expired.",
        code: "TOKEN_EXPIRED",
      })
    }

    if (error.message.includes("invalid") || error.message.includes("malformed")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Invalid token.",
        code: "INVALID_TOKEN",
      })
    }

    return res.status(401).json({
      success: false,
      message: "Access denied. Authentication failed.",
      code: "AUTH_FAILED",
    })
  }
}

module.exports = authMiddleware
