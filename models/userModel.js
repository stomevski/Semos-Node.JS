const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Username already used"]
    },

    emailAddress: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Email already used"]
    },

    password: {
        type: String,
        trim: true,
        required: true
    }
})



UserSchema.pre('save', async function (next) {

    const encryptPassword = await bcrypt.hash(this.password, 10);
    this.password = encryptPassword;

    next();

})



module.exports = mongoose.model('User', UserSchema);