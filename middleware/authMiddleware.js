const jwt = require("jsonwebtoken");
const User = require('../model/user');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/user/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.redirect("/user/login");
        }

        req.user = user;

        next();
    } catch (err) {
        console.log(err);
        return res.redirect("/user/login");
    }
};

module.exports = authMiddleware;