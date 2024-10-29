const express = require('express');
const { addproduct, allProduct, handledelete, updateproduct,getProductByCategory}
 = require('../Controllers/productController');
const { Adminsign, Logadmin } = require('../Controllers/adminController');
const secondRouter = express.Router();

secondRouter.post("/postproduct",addproduct)
secondRouter.get("/manageproduct", allProduct)
secondRouter.delete('/manageproduct/:id', handledelete)
// secondRouter.get('/manageproduct/:id', handleedit  )
secondRouter.get('/login', Logadmin )
secondRouter.post("/updateproduct",updateproduct)
secondRouter.get('/getproduct/:category', getProductByCategory)
secondRouter.post('/signup', Adminsign)

module.exports = secondRouter 
