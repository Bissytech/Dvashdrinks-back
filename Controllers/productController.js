const { get } = require("mongoose");
const usermodel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const cloudinary = require("../utilis/cloudinary");
const productmodel = require("../Model/productModel");

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




// const Adminlogin = async(req,res)=>{
//   const {email,password} = req.body
//   console.log(password);
  
// if (!email || !password) {
//   res.status(400).send({message: "input cannot be empty", status:false})
// }else{
//   try {
//     const user = await usermodel.findOne({email:email})
    
//     console.log(user);
//     if (!user) {
//       res.status(402).send({message: "You are not a registered admin; pls sign up", status:false})
//     }else{
//       const correctpassword =  await bcrypt.compare(password, user.password,)
//       if (!correctpassword) {
//         res.status(405).send({message: "incorrect password", status:false})
//       }else{
//         res.status(200).send({message: "login successful",user, status:true})
//       }
//     }
    
//   } catch (error) {

//     console.log(error);
//     res.status(500).send({message: error.message, status:false})
//   }
// }
// }


// const Adminsign = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { username, password, email } = req.body;
//     if (!username || !password || !email) {
//       res.status(400).send({ message: "Kindly fill all fields" });
//     } else {
//       const existadmin = await adminModel.findOne({ email: email });
//       console.log(existadmin);
//       if (existadmin) {
//         res.status(402).send({ message: "Admin already exist", status: false });
//       } else {
//         const hashpassword = await bcrypt.hash(password, 10);
//         console.log(hashpassword);
//         const newadmin = await adminModel.create({
//           username,
//           email,
//           password,
//         });
//         if (newadmin) {
//           res
//             .status(200)
//             .send({ message: "Admin signup successful", status: true });
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message, status: false });
//   }
// };


// const handleedit = (req, res) => {

//   const { id } = req.params;
//   console.log(id);
//   if (!id) {
//     return res.status(404).send({ message: "ID is required" });
//   } else {
//     try {
//       const toEdit = productmodel.findById(id);
//       if (toEdit) {
//         console.log(toEdit);

//         return res
//           .status(200)
//           .send({ message: "Product data retrieved", toEdit });
//       }
//     } catch (error) {
//       console.error("Error editing product", error);
//       res.status(500).send({ message: "Server error" });
//     }
//   }
// };

module.exports = { addproduct, allProduct, handledelete,updateproduct, getProductByCategory };
