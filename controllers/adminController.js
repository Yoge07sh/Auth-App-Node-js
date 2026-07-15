const User = require('../model/user.js');
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    getUsers
}