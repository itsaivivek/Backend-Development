const express = require('express');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

app.use(cookieParser())

let temp;

app.get('/', (req, res) => {
    res.cookie("name", "vivek")
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash("password", salt, function(err, hash){
        temp = hash;
      })
    })
    let token = jwt.sign({email: "vivek@gmail.com"}, "secret")
    res.cookie("token", token)
  res.send('Hello World!')
})

app.get('/about', (req, res) =>{
  console.log(req.cookies)

  bcrypt.compare("password", temp, function(err, result){
    console.log("result:", result)
  })
  res.send('About page')

  let data = jwt.verify(req.cookies.token, "secret")
  console.log(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})