const User = require('../model/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
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
                    "mysecretkey",
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

module.exports = {
    registerUser, loginUser
};