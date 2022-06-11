const Sales = require('../models/SalesModel');
const Users = require('../models/UsersModel');
const Products = require('../models/ProductsModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');

//GET ALL SALES:
const getSale = async (req, res) => {
    try {
        const sales = await Sales.find()
        res.send(sales)
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//GET userLogged SALES:
const getUserLoggedSales = async (req, res) => {    
    try {
        const sales = await Sales.find({userId: req.params.id})
        res.send(sales)
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//CREATE SALE:
const createSale = async (req, res) => {
    const { productId, amount } = req.body
    if ( !validator.isMongoId(productId)) {
        res.status(400).send({message:'InvalidParams.'})
        return
    }
    const token = req.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token, process.env.privateKey);
    const userLogged = await Users.find({mail: tokenDecoded.mail});
    const user = userLogged[0];
    const product = await Products.findById(productId);
    try {
        const new_sale = new Sales({ productId, userId : user._id, amount, price : product.price * amount })
        console.log(new_sale);
        await new_sale.save()
        user.sales.push(new_sale)
        await user.save()
        product.totalSales+=amount
        await product.save()
        res.send({message:'Sale Created.'})
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//EDIT SALE:
const editSale = async (req, res) => {
    const { id, userId, productId, amount } = req.body
    if (!validator.isMongoId(id) || !validator.isMongoId(userId) || !validator.isMongoId(productId)) {
        res.status(400).send({message:'Invalid Params.'})
        return
    }
    try {
        //DELETE OLD SALE:
            const sale = await Sales.findById(id);
            
            const product = await Products.findById(sale.productId);
            product.totalSales-=sale.amount;
            await product.save();
            
            const user = await Users.findById(sale.userId);
            for (let i = 0; i < user.sales.length; i++) {
                if (user.sales[i]._id == id) {
                    user.sales.splice(i, 1);
                    break;
                }
            }
            await user.save();
            await Sales.findByIdAndDelete(id);
        //CREATE NEW SALE:
            const new_sale = new Sales({ productId, userId, amount, price : product.price * amount })
            await new_sale.save()
            user.sales.push(new_sale)
            await user.save()
            product.totalSales+=amount
            await product.save()
            res.send({message:'Sale Updated.'})
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//DELETE SALE:
const deleteSale = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send({message:'Invalid Params.'})
        return
    }
    try {
        const sale = await Sales.findById(id);
        const product = await Products.findById(sale.productId);
        product.totalSales-=sale.amount;
        await product.save();
        const user = await Users.findById(sale.userId);
        for (let i = 0; i < user.sales.length; i++) {
            if (user.sales[i]._id == id) {
                user.sales.splice(i, 1);
                break;
            }
        }
        await user.save();
        await Sales.findByIdAndDelete(id);
        if (sale) {
            res.send({message:'Sale Deleted.'})
        } else {
            res.status(400).send({message:'The sale does not exist.'})
        }
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

module.exports = {
    getSale,
    getUserLoggedSales,
    createSale,
    editSale,
    deleteSale
}