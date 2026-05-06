const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "No token provided"});
        }

        const verified = jwt.verify (
            token.replace("Bearer ", ""),
            "SECRET_KEY"
        );

        req.user = verified;

        next();
        
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};