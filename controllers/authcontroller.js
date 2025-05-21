const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generatejwt = require('../utils/generateToken');


exports.signup = async (req, res) => {
    const { name, email, password, gender } = req.body;
    console.log(name, email, password, gender);

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' })
    }

    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' })
        }
        const user = await User.create({
            name: name,
            email: email,
            password: password,
            gender: gender
        });

        return res.status(201).json({ message: 'User created successfully' })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        // console.log("Login input:", email, password)

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const isValid = await user.validatePassword(password)
        // console.log(isValid, 'hres is the valid')
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid  password' })
        }

        const token = generatejwt(user)
        res.cookie('token', token, { httpOnly: true })

        return res.status(200).json({ message: 'Logging success',token,formsubmit: user.formsubmit});
    } catch (err) {
        console.error('Login Error:', err)
        return res.status(500).json({ message: ' server error' })
    }
};








