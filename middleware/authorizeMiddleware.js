const authorize = (...roles) => {
    return (req, res, next) => {
        return res.status(403).json({
            message: "access Denied"
        });
    }
};

module.exports = authorize;