export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.roles)) {
            return res.status(403).json({ message: "Access Denied" })
        }
        next()
    }
}