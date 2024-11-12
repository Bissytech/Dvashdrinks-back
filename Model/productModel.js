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

const paymentSchema = mongoose.Schema({
  cardNum:{
    type:String,
    required: true,
    length : 12
 
  },
  expiryDate:{
    type: String,
    required: true,
    length : 4
  
  },
  cvv:{
    type: String,
    required: true,
    length : 3
 
  }
})

const productmodel = mongoose.model("product_collections", productSchema);
const paymentModel = mongoose.model('transactions_completed', paymentSchema)
module.exports = {productmodel, paymentModel};
