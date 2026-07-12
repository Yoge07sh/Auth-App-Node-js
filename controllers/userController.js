const User = require('../model/user');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const showHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/views/home.html"));
}
const showRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/views/register.html"));
}
const showLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/views/login.html"));
}
const registerUser = async (req, res) => {
    try {
        const existinguser = await User.findOne({ email: req.body.email });
        if (existinguser) {
            return res.send("email is already registered");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userData = {
            ...req.body,
            password: hashedPassword
        }
        const user = new User(userData);
        await user.save();
        console.log("data saved successfully");
        res.redirect('/home.html')
    } catch (err) {
        console.log(err)
    }
}
const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (isMatch) {
                const token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email
                    },
                    "mysecretKey",
                    {
                        expiresIn: "10min"
                    }
                )
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 10 * 60 * 1000
                })

                res.redirect("/user/home");
            } else {
                res.end("invalid password plz try again..");
            }
        } else {
            res.end("user with this email not exists....");
        }
    } catch (err) {
        console.log(err);
    }
}
const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect('/user/login');
}

module.exports = {
    showHomePage,
    showRegisterPage,
    showLoginPage,
    registerUser,
    loginUser,
    logout
};