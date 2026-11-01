require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI).then(console.log('connected'))

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    imageUrl: String
})

module.exports = mongoose.model('user', userSchema)