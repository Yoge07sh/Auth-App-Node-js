const Users = require('../model/user');
const registerUser = async (req, res) => {
    try {
        const user = new Users(req.body);
        await user.save();
        console.log("data saved successfully");
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    registerUser
};