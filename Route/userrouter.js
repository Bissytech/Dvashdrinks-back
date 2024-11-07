const express = require('express');
const router = express.Router();
const { Signup, Login, Move, handleAddToCart, finalPayment} = require("../Controllers/userController");
const Verifytoken = require('../Middleware/Verifytoken');
const { finalPayment } = require('../Controllers/productController');



router.post("/sign-up", Signup);
// router.get('/home', getName)
router.post("/login", Login);
router.post('/drinks', Verifytoken,  handleAddToCart)
router.get('/drinks/details/:id', Move)
router.post('/payonline/cardpayment', finalPayment)
module.exports = router
