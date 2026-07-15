const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
       return res.redirect('/user/login');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.redirect('/user/login');
    }

};
module.exports = authMiddleware;