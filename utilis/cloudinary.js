const cloudinary = require("cloudinary").v2

 cloudinary.config({
    cloud_name: "dmw64lvlo",
    api_key: process.env.APIkey,
    api_secret:process.env.APIsecret,
    secure:true
    
 })

 module.exports = cloudinary
