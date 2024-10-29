let mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    email:{
        type:String,
        required: true,
        lowercase: true,
        unique:true,
        index:true,
    },
    password:{
type: String,
required:true,
minLength:[5, 'password cannot be too short']
    }
});
const adminModel = mongoose.model('adminAccess_collections', adminSchema)
module.exports = adminModel;