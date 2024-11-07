const {get} = require('mongoose');
const usermodel = require('../Model/userModel')
const {productmodel, paymentModel} = require('../Model/productModel')
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken')
// const productmodel = require('../Model/productModel');
const { welcomemail } = require('../utilis/Mailer');

const Signup = async(req,res)=>{
console.log(req.body);
try {
    const {firstName,lastName,email,password} = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400).send({message:"input cannot be empty", status:false})
    } else {
       const existuser = await usermodel.findOne({email:email});
       console.log(existuser);
       
       if (existuser) {
        res.status(402).send({message:"user already exist", status:false})
       } else {
        const hashpassword = await bcrypt.hash(password, 10)
        console.log(hashpassword);
        const newuser = await usermodel.create({
          firstName,lastName,email,password:hashpassword
        })

        if (newuser){
            res.status(200).send({message: "signup successful", status:true})
            welcomemail(email,firstName)
        }
        
       } 
    }
} catch (error) {
    console.log(error);
    res.status(500).send({message: error.message, status:false})
    
}

}


const Move = async (req,res)=>{
const {id} = req.params
if (!id){
  res.status(400).send({message: "id is required"})
}else{
  try {
    let product = await productmodel.findOne({_id:id})
    if(product){
      res.status(200).send({message:'product gotten successfully', product , status: 'okay'})
    }else{
      res.status(404).send({message:'couldnt get product', status: false})
    }
    
  } catch (error) {
    res.status(500).send({message:'internal server error', status: false})
  }
}

}
const handleAddToCart = async(req,res)=>{
  const {productId, quantity} = req.body
  if(!productId, !quantity){
   return res.status(400).send({message: "No product added"})
  }
 else{
 let itemCart = await productmodel.findbyId(productId)
 try {
  if (itemCart) {
    res.status(200).send({message: 'Product was found', status:true})
  } 
 } catch (error) {
  
 }
 }
}

const finalPayment = async(req, res)=>{
  const{cardNum, expiryDate, cvv} = req.body
  console.log(req.body);
  
  if(!cardNum||!expiryDate||!cvv){
    res.status(400).send({message:"Pls input all card"})
  }
 else{
  const paymentSuccess = await paymentModel.create({
    expiryDate,cvv,cardNum
    })
  
    if (paymentSuccess){
        res.status(200).send({message: "Payment made successfully", status:true})
      
    }
 }
  
  };

const Login = async(req,res)=>{
    const {email,password} = req.body
    console.log(password);
    
  if (!email || !password) {
    res.status(400).send({message: "input cannot be empty", status:false})
  }else{
    try {
      const user = await usermodel.findOne({email:email})
      
      console.log(user);
      if (!user) {
        res.status(402).send({message: "You are not a registered user; pls sign up", status:false})
      }else{

        const correctpassword =  await bcrypt.compare(password, user.password,)
        const secretKey = process.env.JWT_SECRET

          const token = JWT.sign({
            user : {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              userId: user._id
            }
          }, secretKey, {expiresIn: '1d'})


      
        if (!correctpassword) {
          res.status(405).send({message: "incorrect password", status:false})
        }else{
          res.status(200).send({message: "login successful",user,token, status:true})
          
        }
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).send({message: error.message, status:false})
    }
  }
}
module.exports = {Signup, Login, Move, handleAddToCart, finalPayment}