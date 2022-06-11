const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    userId: String,
    productId: String,
    amount: Number,
    price: Number
},{
    timestamps: true
})

const SalesModel = mongoose.model('Sales',SalesSchema)

module.exports = SalesModel