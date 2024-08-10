const jwt = require('jsonwebtoken');
const customError = require("./error");
const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(customError(401, "Unauthorized"));
        }
        req.user = decoded;
        next();
    });

}

module.exports = verifyToken;