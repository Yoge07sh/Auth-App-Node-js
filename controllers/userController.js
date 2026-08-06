const User = require('../model/user');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


const showHomePage = (req, res) => {
    res.render("home", {
        user: req.user
    });
};

const showRegisterPage = (req, res) => {
    res.render('register')
}


const showLoginPage = (req, res) => {
    res.render('login')
}
const showProfile = (req, res) => {
    res.render("profile", {
        user: req.user
    });
};

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const email = req.body.email.toLowerCase();
    req.body.email = email;

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

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.redirect("/user/home");
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
                        email: user.email,
                        role: user.role
                    },
                    process.env.JWT_SECRET,
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
    res.render('login');
}

const showChangePasswordPage = (req, res) => {
    res.render('changepassword');
}


const changePassword = async (req, res) => {



    const {
        currentPassword,
        newPassword,
        confirmPassword
    } = req.body;

    try {

        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.render("changePassword", {
                user,
                error: "Current password is incorrect."
            });
        }

        if (newPassword !== confirmPassword) {
            return res.render("changePassword", {
                user,
                error: "New password and confirm password do not match."
            });
        }

        const samePassword = await bcrypt.compare(
            newPassword,
            user.password
        );

        if (samePassword) {
            return res.render("changePassword", {
                user,
                error: "New password cannot be the same as the current password."
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.render("changePassword", {
            user,
            success: "Password changed successfully."
        });

    } catch (err) {
        console.log(err);

        return res.render("changePassword", {
            user: req.user,
            error: "Something went wrong."
        });
    }
};

const showEditProfilePage = (req, res) => {
    res.render("editprofile", {
        user: req.user
    });
};

const updateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.redirect("/user/login");
        }

        const { firstname, lastname, email } = req.body;

        const lowerEmail = email.toLowerCase();

        const existingUser = await User.findOne({
            email: lowerEmail,
            _id: { $ne: user._id }
        });

        if (existingUser) {
            return res.render("editProfile", {
                user,
                error: "Email is already in use."
            });
        }

        user.firstname = firstname;
        user.lastname = lastname;
        user.email = lowerEmail;

        await user.save();

        return res.render("profile", {
            user,
            success: "Profile updated successfully."
        });

    } catch (err) {
        console.log(err);

        return res.render("editProfile", {
            user: req.user,
            error: "Something went wrong."
        });
    }
};

module.exports = {
    showHomePage,
    showRegisterPage,
    showLoginPage,
    showProfile,
    registerUser,
    loginUser,
    logout,
    showChangePasswordPage,
    changePassword,
    showEditProfilePage,
    updateProfile
};