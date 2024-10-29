let mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique:true,
        index:true,
    },
    password:{
        type: String,
        required: true,
        minLength: [5, "password can't be too short"]
    },

    cart:{
        type: Array,
    }
});
const usermodel = mongoose.models.user_collections || mongoose.model('user_collections', userSchema);
module.exports = usermodel;