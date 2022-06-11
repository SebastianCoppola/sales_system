const Users = require('../models/UsersModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

//LOGIN:
const logIn = async (req, res) => {
    const {mail,password} = req.body;
    try{
        const user = await Users.find({mail})
        if(user.length === 0){
            res.status(404).send({message:'User does not exist.'})
            return;
        }
        const storedPassword = user[0].password;
        bcrypt.compare(password, storedPassword,(err,resCompare)=>{
            if(err){
                res.status(500).send({message:'Server Error.'})
                return;
            }
            if(!resCompare){
                res.status(401).send({message:'Invalid Params.'})
                return;
            }
            const token = jwt.sign({mail}, process.env.privateKey);
            res.cookie('token', token, {maxAge: 60 * 60 * 1000})
            user[0].logged = true;
            user[0].save();
            //console.log(user);
            res.send({token, message: 'User logged in.'})
        })
    }catch(e){
        res.status(500).send({message:'Server Error.'})
    }
}

//LOGOUT
const logOut = async (req,res) => {

    const token = req.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token, process.env.privateKey);
    const userLogged = await Users.find({mail: tokenDecoded.mail});
    const user = userLogged[0];
    
    user.logged = false;
    user.save();
    res.clearCookie('token');
    res.send({message:'User logged out.'})
}

//LOGOUT:
module.exports = {
    logIn,
    logOut
}