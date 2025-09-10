const mongoose = require("mongoose");
const Product = require("../models/ProductModel");
const ProductModel = require("../models/ProductModel");
const productId = mongoose.Schema.Types.ObjectId;

/* const CONNECTION_URI = process.env.MONGODB_CONNECTION_URI ||'mongodb+srv://bhattaanjana0:anjana123@anjana.zcmelmw.mongodb.net/myCollection?retryWrites=true&w=majority&appName=anjana' ;
 */
const getProducts = async () => {
  try {

    return await Product.find();
  } catch (error) {
    console.error(error);
  } /* finally {
    await mongoose.connection.close();
  } */
};

const getProductById = async (id) => {
  try {

    return await Product.findById(id);
  } catch (error) {
    console.error(error);
  }
};

const getProductsBySellerId = async ({ id }) => {
  try {

    return await ProductModel.find({ seller: id });
  } catch (error) {
    console.error(error);
  } 
};

const getProductsByCatagory = async(catagory)=> {
  try{
    return await ProductModel.find(catagory);

  }catch(error){
    console.log(error);
  }
}

const createProduct = async ({
  seller,
  title,
  catagory,
  photos,
  price,
  description,
}) => {
  try {

    const product = new ProductModel({
      seller,
      title,
      catagory,
      photos,
      price,
      description,
    });
    await product.save();

    return product;
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (id, {title, catagory, photos, description, price}) => {
  try {

    const product = await ProductModel.findByIdAndUpdate(id, {title, catagory, photos, description, price});
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  } 
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  getProductsBySellerId,
  getProductsByCatagory
};
