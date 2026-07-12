const jwt = require('jsonwebtoken');
const authMiddleware = (req, res,next) => {
const token = req.cookies.token;
console.log(token);
if(!token) {
    res.redirect('/login.html');
} 
next();
};
module.exports = authMiddleware;