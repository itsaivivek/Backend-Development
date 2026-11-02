require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

const userSchema = mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    password: String,
    age: Number
})

module.exports = mongoose.model('user', userSchema)