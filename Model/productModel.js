let mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  productdescription: {
    type: String,
    required: true,
  },
  productprice: {
    type: Number,
    required: true,
  },
  coverimage: {
    type: String,
    required: true,
  },
  productCategory: {
    type:String,
    required: true , 
    enum : ['drinks' , 'parfaits']
  }
});
const productmodel = mongoose.model("product_collections", productSchema);
module.exports = productmodel;
