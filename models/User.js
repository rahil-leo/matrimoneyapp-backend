const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    userid: {
        type: Number,
        default: Date.now,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    gender: {
        type: String,

    },

    date: {
        type: String,
        default: ''
    },
    age: {
        type: String,
        default: ''
    },
    income: {
        type: String,
        default: ''
    },
    matrialstatus: {
        type: String,
        default: ''
    },
    religion: {
        type: String,
        default: ''
    },
    district: {
        type: String,
        default: ''
    },
    education: {
        type: String,
        default: ''
    },
    occupation: {
        type: String,
        default: ''
    },
    photo: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    height: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: ''
    },
    formsubmit: {
        type: Boolean,
        default: false,
    },


    notintrested: {
        type: Boolean,
        default: false,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    // declined: {
    //     type: Boolean,
    //     default: false,
    // },



});


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


userSchema.methods.validatePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);













