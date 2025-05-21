const mongoose = require('mongoose')

exports.connectDB = async () => {
    const MONGO_URI = 'mongodb+srv://jubail:28308000@rahil.f0nsc.mongodb.net/marimonyapp';
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')
}
