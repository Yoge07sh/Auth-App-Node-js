const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    }

})
const user = mongoose.model('user', usersSchema);
module.exports = user;