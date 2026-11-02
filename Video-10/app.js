const express = require('express');
const app = express()
const port = 3000
const path = require('path')
const userModel = require('./models/user')

const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('./models/user');
const saltRounds = 10

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/home', async (req, res) => {
    if (!req.cookies.token) res.redirect('/login')
    try {
        let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const user = await userModel.findOne({email: data.email})
        console.log(user)
        res.render('home', {user})
    }
    catch (err) {
        res.clearCookie('token')
        res.redirect('/login')
    }
})
app.get('/profile/:id', async (req, res) => {
    let user = await userModel.findById(req.params.id)
    res.render('profile', {user})
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register/', (req, res) => {
    const { fullname, username, email, password, age } = req.body

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            if (err) return res.send('Registration failed')
            // Store hash in your password DB.
            let createdUser = await userModel.create({
                fullname,
                username,
                email,
                password: hash,
                age
            })
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            res.cookie("token", token);
            res.redirect('/home')
        });
    });
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (!user) res.send('something went wrong')

    bcrypt.compare(password, user.password, function (err, result) {
        if (!result) res.send('something went wrong')
        else {
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            res.cookie("token", token);
            res.redirect('/home')
        }
    });


})

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})