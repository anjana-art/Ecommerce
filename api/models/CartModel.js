const mongoose = require("mongoose");
//const orderDetailSchema = require('./OrderModel').orderDetailSchema.Schema;

const cartSchema = mongoose.Schema({
    _customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type: String
    },
    price:{
        type: Number
    },
    photos:{
        type: [String]
    },

    cartDetails: [{
        type: String /* orderDetailSchema */
    }],
});

module.exports = mongoose.model('Cart', cartSchema,'cart');