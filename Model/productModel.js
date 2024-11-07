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
    minLength : [12, 'Card number cannot be more than 12 digits']
  },
  expiryDate:{
    type: String,
    required: true,
    minLength : [4, 'Input the date with the format 0105']
  },
  cvv:{
    type: String,
    required: true,
    minLength : [3, 'input the 3 digit number at the back of your card']
  }
})
const paymentModel = mongoose.model('transactions_completed', paymentSchema)
const productmodel = mongoose.model("product_collections", productSchema);
module.exports = {productmodel, paymentModel};
