const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../models/UsersModel');
require('dotenv').config();

const app = express.Router() 

app.post("/", async (req, res) => {
    const {token} = req.body;
    const tokenDecoded = jwt.decode(token, process.env.privateKey);
    try{
        const user = await Users.find({mail: tokenDecoded.mail});
        res.send(user[0]._id);
    } catch(e){
        return res.status(404).send("Invalid Token.")
    }
})

module.exports = app;