const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the user schema
const userSchema = new Schema({

fullname: {type: String,required: true},
photo: {type: String, default: null},
dateOfBirth: {type: String},
email: {type: String, required: true, unique: true, lowercase: true},
address: {type: String},
phoneNumber: {type: Number},
password: {type: String,required: true},
role: { type: [String], enum: ["Admin", "Professional", "Student"], required: true},

});

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel