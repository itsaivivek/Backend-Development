require('dotenv').config()

const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URI)

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String
})

module.exports = mongoose.model('user', userSchema)