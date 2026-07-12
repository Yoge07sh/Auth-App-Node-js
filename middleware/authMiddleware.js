const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
       return res.redirect('/user/login');
    }
    try {
        const decoded = jwt.verify(token, "mysecretKey");
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/user/login');
    }

};
module.exports = authMiddleware;