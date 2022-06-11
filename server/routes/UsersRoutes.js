const express = require('express');
const { getUsers, getOneUser, signUp, editUser, deleteUser, } = require('../controllers/UsersController');
const Auth = require('../middlewares/Auth');


const app = express.Router() 

app.get("/",getUsers)

app.post("/getoneuser",getOneUser)

app.post("/",signUp)

app.put("/",Auth,editUser)

app.delete("/",Auth,deleteUser)


module.exports = app;