const { get } = require("mongoose");
const usermodel = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const cloudinary = require("../utilis/cloudinary");
const {productmodel} = require("../Model/productModel");

const addproduct = async (req, res) => {
  const { productname, productdescription, productprice, coverimage , productCategory} =
    req.body;
  //  console.log( productname, productdescription, productprice, coverimage);
  if (!productname || !productdescription || !productprice || !coverimage || !productCategory) {
    res
      .status(400)
      .send({ message: "All fields are mandatory", status: false });
  } else {
    try {
      if (!coverimage) {
        res.status(409).send({ message: "image is mandatory here" });
      } else {
        const convertedImage = await cloudinary.uploader.upload(coverimage);
        const uploadImage = convertedImage.secure_url;
        console.log(uploadImage);
        let saved = await productmodel.create({
          productname,
          productdescription,
          productprice,
          coverimage: uploadImage,
          productCategory
        });
        if (!saved) {
          res
            .status(401)
            .send({ message: "unable to save to databasee", status: false });
        } else {
          res
            .status(200)
            .send({ message: "saved to database successfully", status: true });
        }
      }
      //   productmodel.create( {productname, productdescription, productprice, coverimage})
    } catch (error) {
      console.log(error);
    }
  }
};

const getProductByCategory = async (req,res) =>{
  const category = req.params.category
  if (!category) {
    res.status(400).send({message: 'Category not selected', status:false})
  }else{
    try {
      const products = await productmodel.find({productCategory:category})
    if (!products) {
      res.status(404).send({message: 'Product not found'})
    }else{
      res.status(200).send({message: 'Product fetched successfully' , products , status:'ok'})
    }
    } catch (error) {
      res.status(500).send({message: 'internal server error' , status:false})
    }
  }
}

const allProduct = async (req, res) => {
  try {
    let data = await productmodel.find();
    if (!data) {
      res.status(400).send({ message: "couldnt get products" });
    } else {
      res.status(200).send({
        message: "products gotten successfully",
        data,
        status: "okay",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
    console.log(error);
  }
};



const handledelete = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: "ID is required" });
  }
  try {
    const deletedProduct = await productmodel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Server error" });
  }
};
const updateproduct = async(req,res)=>{ 
const {_id , productname,productdescription,productprice,coverimage} = req.body
if(!productname || !productdescription || !productprice || !coverimage || !_id){
  res.status(400).send({message: "Kindly fill in the empty field"})
}
try {
  const productupdated = await productmodel.findOneAndUpdate({_id} ,{productname,productdescription,productprice,coverimage} , {new:true})
  if (productupdated) {
  res.status(200).send({message:"product edited successfully"})
  }
} catch (error) {
  res.status(500).send({ message: "internal server error" });
  
  console.error("Error updating product:",error)
}
}


module.exports = { addproduct, allProduct, handledelete,updateproduct, getProductByCategory};
