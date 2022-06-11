const Users = require('../models/UsersModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

//GET ALL USERS:
const getUsers = async (req, res) => {
    try {
        const users = await Users.find()
        res.send(users)
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//GET ONE USER:
const getOneUser = async (req, res) => {
    const {id} = req.body;
    try {
        const user = await Users.find({_id: id})
        await res.send(user)
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//SIGN UP:
const signUp = async (req, res) => {
    try{
        const { name, surname, mail, password } = req.body
        if (!validator.isAlpha(name, ['es-ES']) || !validator.isAlpha(surname, ['es-ES']) || !validator.isEmail(mail)) {
            res.status(400).send({message:'InvalidParams.'})
            return;
        }
        bcrypt.hash(password, 10, async (err, hash) =>{
            if(err){
                res.status(500).send({message:'Server Error.'})
            }
            const new_user = new Users({name, surname, mail, password : hash, logged : false})
            new_user.save()
            res.send({userId: new_user._id, message:"User Saved."})
        })
    }catch(err){
        res.status(500).send({message:'Server Error.'})    
    }
}

//EDIT A USER:
const editUser = async (req, res) => {
    const { id, name, surname, mail, password } = req.body
    if (!validator.isMongoId(id) || !validator.isAlpha(name, ['es-ES']) || !validator.isAlpha(surname, ['es-ES']) || !validator.isEmail(mail)) {
        res.status(400).send({message:'InvalidParams.'})
        return;
    }
    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            if(err){
                res.status(500).send({message:'Server Error.'})
            }
            const user = await Users.findById(id)
            await user.updateOne({ $set: { name, surname, mail, password : hash} })
            res.send("User Updated.")
        })   
    }catch(e){
        res.status(500).send({message:'Server Error.'})
    }
}

//DELETE A USER:
const deleteUser = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send({message:'InvalidParams.'})
        return;
    }
    try {
        const encontrado = await Users.findByIdAndDelete(id)
        if (encontrado) {
            res.send({message:'User Deleted.'})
        } else {
            res.status(400).send({message:'User does not exist.'})
        }
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

module.exports = {
    getUsers,
    getOneUser,
    signUp,
    editUser,
    deleteUser
}