const User = require('../models/User')
const cloudinary = require('cloudinary').v2


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
        console.log(userdata,'nothing found')
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

exports.getMatches = async (req, res) => {
    try {
        const userCheck = await User.findOne({name:req.user.name})
        // const oppositeGender = userCheck.gender === 'male' ? 'female' : 'male'
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




