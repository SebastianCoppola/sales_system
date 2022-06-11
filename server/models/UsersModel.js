const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: { type:String , required:true },
    surname: String, 
    mail: { type: String , required:true},
    password: { type: String , required:true},
    logged: Boolean,
    sales: []
},{
    timestamps: true
})

const UsersModel = mongoose.model('Users',UsersSchema)

module.exports = UsersModel