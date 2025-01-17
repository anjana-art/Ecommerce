const mongoose = require("mongoose");
const UserSchema = require('./UserModel')
const {Schema, model} = require('mongoose'); 


const ProductSchema = new mongoose.Schema({
  seller:[ {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  } ],
  title: {
    type: String,
    required: true,
  },
  catagory: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    minLength: [5, "Description should have at least 5 characters"],
    maxLength: 1000,
  },
  price: {
    type: Number,
    min: [0, "Price must be higher than 0"],
    max: [100000, "Price must be lower than 100000"],
  },
  created: {
    type: Date,
  },
});

ProductSchema.pre("save", function (next) {
  if (!this.created) {
    this.created = new Date();
  }

  return next();
});

module.exports = mongoose.model("Product", ProductSchema, "product");