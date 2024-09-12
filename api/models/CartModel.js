const mongoose = require("mongoose");
//const orderDetailSchema = require('./OrderModel').orderDetailSchema.Schema;

const cartSchema = mongoose.Schema(
  {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    title:{
        type: String,
        required:true
    }
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cart', cartSchema,'cart');