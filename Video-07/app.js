const express = require('express');
const app = express()
const port = 3000
const userModel = require('./usermodel')

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/create', async (req, res) => {
  let createdUser = await userModel.create({
    name: "dipesh",
    email: "dipesh@gmail.com",
    username: "dipesh000"
  })
  res.send(createdUser)
}
)

app.get('/read', async (req, res) => {
    let users = await userModel.findOne({username: "dipesh000"});
    res.send(users)
})

app.get('/update', async (req, res)=>{
    let updatedUser = await userModel.findOneAndUpdate({username: "vivek123"}, {name: "Vivek Bhatt"}, {new: true})
    res.send(updatedUser)
})

app.get('/delete', async (req, res)=>{
    let deletedUser = await userModel.findOneAndDelete({username:"dipesh000"})
    res.send(`Dear ${deletedUser}, your account has been deleted`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})