const express = require('express');
const { logIn, logOut } = require('../controllers/LogController');


const app = express.Router() 

app.post("/login",logIn)

app.post("/logout",logOut)


module.exports = app;