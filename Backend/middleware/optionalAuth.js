const jwt = require("jsonwebtoken");

const optionalAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // Token nahi hai, request ko guest ki tarah allow karo
    if (!authHeader) {
        return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        req.user = decoded;
        next();
    });
};

module.exports = optionalAuth;