const mongoose = require("mongoose");

const orderDetailSchema = mongoose.Schema({
    _product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        require:true
    },
    price:{
        type: Number,
    },
    quantity:{
        type: Number,
        require:true
    },
    amount:{
        type:Number,
        
    },
    
},
{versionKey: false, _id: false}
);

module.exports = mongoose.model('OrderDetails', orderDetailSchema, 'orderDetails');
