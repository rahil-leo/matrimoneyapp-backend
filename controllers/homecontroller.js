const User = require('../models/User')
const cloudinary = require('cloudinary').v2
const Request = require('../models/Request')
const { request } = require('express')


exports.personal = async (req, res) => {
    try {
        const { date, age, income, matrialstatus, religion, district, education, occupation, address, height, language, } = req.body
        const photo = req.files.photo
        // console.log(photo)
        if (!photo) {
        }
        const uploadResult = await cloudinary.uploader.upload(photo.tempFilePath)
        const username = req.user
        const user = await User.findOne({ name: username.name })
        if (!user) {
            return res.status(404).json({ message: 'no user' })
        }
        user.date = date
        user.age = age
        user.income = income
        user.matrialstatus = matrialstatus
        user.religion = religion
        user.district = district
        user.education = education
        user.occupation = occupation
        user.photo = uploadResult.url
        user.address = address
        user.height = height
        user.language = language
        user.formsubmit = true
        user.save()

        return res.status(200).json({ message: 'data collected', userdata: user })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: ' error' })
    }
}

exports.getHome = async (req, res) => {
    try {
        const userdata = await User.findOne({ name: req.user.name })
        return res.json({ message: 'data send', data: userdata })
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: 'error' })
    }
}

exports.editProfilePicture = async (req, res) => {
    try {
        const image = req.files.image
        // console.log(image)
        const username = req.user
        const user = await User.findOne({ name: username.name })
        const uploadResult = await cloudinary.uploader.upload(image.tempFilePath)
        user.photo = uploadResult.url
        user.save()
        return res.json({message:'photo send',data:user})
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: 'error in server' })
    }
}

exports.editProfile = async (req, res) => {
    try {
        const userdata = await User.findById(req.user.id)
        // console.log(userdata)
        return res.json({message:'data sended',data:userdata})
    } catch (err) {
        console.log(err)
        return res.status(404).json({message:'server error'})
    }
}

exports.postEditProfile = async (req, res) => {
    try {
        const { name, age, height, address} = req.body
        console.log(name, age, height, address)
        const userdata = await User.findById(req.user.id)
        // console.log(userdata,'nothing found')
        userdata.name = name
        userdata.age = age
        userdata.height = height;
        userdata.address = address;
        await userdata.save()
        return res.json({ message: 'edited data sended', editdata: userdata })
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: 'server error' })
    }
}
exports.postEditProfessional = async (req,res) => {
    try {
        const { education, income, occupation } = req.body
        // console.log(education, income, occupation)
        const userdata = await User.findById(req.user.id)
        userdata.education = education
        userdata.occupation = occupation;
        userdata.income = income
        await userdata.save()
        return res.json({ message: 'professional edited data sended', editdata: userdata })
    } catch (err) {
        console.log(err)
        return res.status(404).json({message:'server error'})
    }
}

exports.getMatches = async (req, res) => {
    try {
        const userCheck = await User.findOne({ name: req.user.name })
        // console.log(userCheck.gender)
        const userdata = await User.find(
            {
                name: { $ne: req.user.name },
                gender:{$ne:userCheck.gender},
                formsubmit: true,
                matrialstatus: { $eq: userCheck.matrialstatus },
                religion: { $eq: userCheck.religion },
                language: { $eq: userCheck.language },
            })
        // console.log(userdata)
        return res.json({message:'match data sended',matches:userdata})
    } catch (err) { 
        console.log(err)
        return res.status(404).json({ message: 'server error' })
    }
}

exports.requestMatches = async (req, res) => {
    try {
        const sender = await User.findById(req.user.id);
        const receiver = await User.findOne({ userid: req.body.id }); 

        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        await Request.create({
            id: Date.now(),
            sender: sender.userid,
            reciver: req.body.id, 
            name: sender.name,
            email: sender.email,
            gender: sender.gender,
            date: sender.date,
            age: sender.age,
            income: sender.income,
            matrialstatus: sender.matrialstatus,
            religion: sender.religion,
            district: sender.district,
            education: sender.education,
            occupation: sender.occupation,
            address: sender.address,
            photo: sender.photo
        });
        const requested = await Request.findOne({ sender: sender.userid })
        requested.requested = true
        await requested.save()

        return res.status(200).json({ message: 'Request sent successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};




exports.getReceivedRequests = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.json({ message: 'user not here' })
        }
        const requests = await Request.find({ reciver: user.userid, requested: { $eq: true } })
        if (requests <=1) {
            return res.status(404).json({message:'already sended request'})
        }

        return res.status(200).json({ message: 'received requests', requests });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
};

exports.checkaccepted =async (req, res)=>{
    try {
        const { id } = req.body
        console.log(id, 'here is the id')
        const accepted = await Request.findOne({ id: id })
        console.log(accepted)
        accepted.accepted = true
        await accepted.save()
        return res.status(404).json({message:'user accepted',accepted:accepted})
    } catch (err) {
        console.log(err)
        return res.status(404).json({message:'server error'})
    }
}















