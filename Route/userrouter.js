const express = require('express');
const router = express.Router();
const { Signup, Login, Move, handleAddToCart} = require("../Controllers/userController");
const Verifytoken = require('../Middleware/Verifytoken');



router.post("/sign-up", Signup);
// router.get('/home', getName)
router.post("/login", Login);
router.post('/drinks', Verifytoken,  handleAddToCart)
router.get('/drinks/details/:id', Move)

module.exports = router
