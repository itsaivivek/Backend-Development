require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }]
})

module.exports = mongoose.model('user', userSchema);