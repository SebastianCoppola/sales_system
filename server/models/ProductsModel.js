const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    img: String,
    category: String,
    totalSales: Number
},{
    timestamps: true
})

const ProductsModel = mongoose.model('Products',ProductsSchema)

module.exports = ProductsModel