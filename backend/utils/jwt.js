const jwt = require("jsonwebtoken")

class JWTUtils {
  // Generate access token
  static generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "1h",
      issuer: "lernovate",
      audience: "lernovate-users",
    })
  }

  // Generate refresh token
  static generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
      issuer: "lernovate",
      audience: "lernovate-users",
    })
  }

  // Verify access token
  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET, {
        issuer: "lernovate",
        audience: "lernovate-users",
      })
    } catch (error) {
      throw new Error("Invalid or expired access token")
    }
  }

  // Verify refresh token
  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
        issuer: "lernovate",
        audience: "lernovate-users",
      })
    } catch (error) {
      throw new Error("Invalid or expired refresh token")
    }
  }

  // Generate token pair
  static generateTokenPair(user) {
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    }

    const accessToken = this.generateAccessToken(payload)
    const refreshToken = this.generateRefreshToken({ userId: user._id })

    return { accessToken, refreshToken }
  }

  // Set HTTP-only cookies
  static setTokenCookies(res, accessToken, refreshToken) {
    const isProduction = process.env.NODE_ENV === "production"

    // Access token cookie (shorter expiry)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
      path: "/",
    })

    // Refresh token cookie (longer expiry)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    })
  }

  // Clear token cookies
  static clearTokenCookies(res) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    })

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    })
  }
}

module.exports = JWTUtils
