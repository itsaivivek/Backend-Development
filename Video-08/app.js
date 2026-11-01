const express = require('express');
const app = express()
const port = 3000
const path = require('path')
const userModel = require('./models/user')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
  const users = await userModel.find().sort({_id: -1}) // let the new user appear in first. Using _id because its first 4 bytes contail timestamps
  res.render('index', {users})
})

app.post('/create', async (req, res) => {
  const {username, email, imageUrl} = req.body
  await userModel.create({
    username,
    email,
    imageUrl
  })
  
  res.redirect('/')
})

app.post('/edit/:id', async (req, res) => {
  const user = await userModel.findById(req.params.id) // finding user with _id
  const {username, email, imageUrl} = req.body // destructring from form body
  
  // If input was blank then using previous values through user
  user.username = username.trim() || user.username
  user.email = email.trim() || user.email
  user.imageUrl = imageUrl.trim() || user.imageUrl
  
  await user.save()
  res.redirect('/')
})

app.get('/edit/:id', async (req, res) => {
  const user = await userModel.findById(req.params.id)
  res.render('edit', {user})
})

app.get('/delete/:id', async (req, res) => {
  await userModel.findByIdAndDelete(req.params.id)
  
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})