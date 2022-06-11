//REQUIRE
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
//ROUTES
const ProductsRoutes = require('./routes/ProductsRoutes');
const SalesRoutes = require('./routes/SalesRoutes');
const UsersRoutes = require('./routes/UsersRoutes');
const SessionRoutes = require('./routes/SessionRoutes');
const DecodeTokenRoutes = require('./routes/DecodeTokenRoutes');

const app = express()
const PORT = process.env.PORT 

//WEBSERVER CONFIG
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//WEBSERVER ROUTES
app.get("/", (req,res) => {
    res.sendFile("public/index.html", {root: "."})
})
app.use("/products",ProductsRoutes)
app.use("/sales",SalesRoutes)
app.use("/users",UsersRoutes)
app.use("/session",SessionRoutes)
app.use("/decode",DecodeTokenRoutes)

//DB CONNECTION & WEBSERVER CONNECTION
mongoose.connect("mongodb://localhost:27017/sales")
.then(()=>{
    console.log("Connected to mongodb")
})
app.listen(3001,()=>{
    console.log(`Server is running on port 3001`)
})
