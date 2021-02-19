const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({

email:{type: String},
title: {type: String},
image: {type: String},
description: {type: String},
category: { type: String, enum: ["Schools", "Training Centers", "Coworking Spaces","Clubs"], required: true},
region: {type: String,required: true},
dateOfCreation: {type: Date, default: Date.now()},
subscribers:[{}]
})


const CardModel = mongoose.model('Card', cardSchema)

module.exports = CardModel;