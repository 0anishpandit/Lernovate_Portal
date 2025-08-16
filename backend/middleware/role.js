// Role-based authorization middleware
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user exists (should be set by auth middleware)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Access denied. User not authenticated.",
          code: "NOT_AUTHENTICATED",
        })
      }

      // Convert single role to array for consistency
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]

      // Check if user has required role
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role(s): ${roles.join(", ")}. Your role: ${req.user.role}`,
          code: "INSUFFICIENT_PERMISSIONS",
          requiredRoles: roles,
          userRole: req.user.role,
        })
      }

      // User has required role, proceed
      next()
    } catch (error) {
      console.error("Role middleware error:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error during authorization.",
        code: "AUTHORIZATION_ERROR",
      })
    }
  }
}

module.exports = roleMiddleware
