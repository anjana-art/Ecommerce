const mongoose = require("mongoose");
//const orderDetailSchema = require('./OrderModel').orderDetailSchema.Schema;

const cartSchema = mongoose.Schema({
    _customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'customers',
        required:true
    },
    cartDetails: [{
        type: String /* orderDetailSchema */
    }],
});

module.exports = mongoose.model('Cart', cartSchema,'cart');