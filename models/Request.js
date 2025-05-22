const { request } = require('express');
const mongoose = require('mongoose');

const requestschema = new mongoose.Schema({
    id: String,
    sender: String,
    reciver: String,
    name: String,
    email: String,
    gender: String,
    date: String,
    age: String,
    income: String,
    matrialstatus:String,
    religion: String,
    district: String,
    education: String,
    occupation: String,
    address: String,
    photo: String,
    requested: {
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model('Request', requestschema);
