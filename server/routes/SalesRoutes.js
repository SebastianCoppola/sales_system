const express = require('express');
const { getSale, getUserLoggedSales, createSale , editSale , deleteSale } = require('../controllers/SalesController');
const Auth = require('../middlewares/Auth');


const app = express.Router() 

app.get("/",Auth,getSale)

app.get("/:id",Auth,getUserLoggedSales)

app.post("/",Auth,createSale)

app.put("/",Auth,editSale)

app.delete("/",Auth,deleteSale)


module.exports = app;