const express = require('express')
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
 require("dotenv").config()
const userrouter = require('./Route/userrouter')
const secondRouter = require('./Route/productrouter')


app.use(cors({origin:"*"}))
app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true, limit: "100mb"}))

// app.cors('/',cors(),(req.res)=>{

// })
app.post('/',async(req,res)=>{
  const{email,password}=req.body
})

app.use("/" , userrouter);
app.use('/admin', secondRouter)
mongoose.connect 

const port = 5005
app.listen(port, ()=>{
    console.log(`This port is working number ${port}`);
    
})

function connect(){
    try {
      const connect = mongoose.connect(process.env.URI)
       if (connect) {
       console.log('connected to database');
       }
    } catch (error) {
     console.log(error);  
    }
}
 connect()