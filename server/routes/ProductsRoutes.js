const express = require('express');
const { getProduct , createProduct , editProduct , deleteProduct } = require('../controllers/ProductsController');
const Auth = require('../middlewares/Auth');


const app = express.Router() 

app.get("/",Auth,getProduct)

app.post("/",Auth,createProduct)

app.put("/",Auth,editProduct)

app.delete("/",Auth,deleteProduct)


module.exports = app;