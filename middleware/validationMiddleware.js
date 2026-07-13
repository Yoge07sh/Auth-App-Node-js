const { body } = require('express-validator');
const registerValidation = [
    body("firstname")
        .trim()
        .notEmpty()
        .withMessage("First name is required"),

    body("lastname")
        .trim()
        .notEmpty()
        .withMessage("last name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("valid email is required"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("password should not be empty")
        .isLength({ min: 5 })
        .withMessage("password must have atleast 5 characters")

]

module.exports = registerValidation