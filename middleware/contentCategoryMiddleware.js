const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT;

const checkPermissions = (requiredPermissions) => {
    return async (req, res, next) => {
        try {
            const token = req.headers?.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Token de autorización no proporcionado" });
            }
            const decodedToken = await jwt.verify(token, secret_key);
            const userRole = decodedToken.role;

            if (!requiredPermissions.includes(userRole)) {
                return res.status(403).json({ message: "Se necesitan permisos para hacer esto" });
            }
            next();
        } catch (error) {
            console.error("Error al verificar permisos:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };
};

module.exports = { checkPermissions }