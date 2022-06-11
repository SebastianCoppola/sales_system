const Products = require('../models/ProductsModel');
const validator = require('validator');

//GET ALL PRODUCTS:
const getProduct = async (req, res) => {
    try {
        const productos = await Products.find({})
        res.send(productos)
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//CREATE PRODUCT:
const createProduct = async (req, res) => {
    const { name, price, description, img, category } = req.body
    try {
        const new_product = new Products({ name, price, description, img, category, totalSales : 0 })
        await new_product.save()
        res.send({message:'Product saved.'})
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//EDIT PRODUCT:
const editProduct = async (req, res) => {
    const { id, name, price, description, img, category } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send({message:'Invalid Params.'})
        return
    }
    try {
        const product = await Products.findById(id)
        await product.update({ $set: { name, price, description, img, category } })
        res.send({message:'Product Updated.'})
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//DELETE PRODUCT:
const deleteProduct = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send({message:'Invalid Params.'})
        return
    }
    try {
        const encontrado = await Products.findByIdAndDelete(id)
        if (encontrado) {
            res.send({message:'Product Deleted.'})
        } else {
            res.status(400).send({message:'Product does not exist.'})
        }
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

module.exports = {
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
}