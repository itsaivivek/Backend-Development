const express = require('express');
const app = express()
const port = 3000

const userModel = require('./models/user.js');
const postModel = require('./models/post.js');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/create-user', async (req, res) => {
    const user = await userModel.create({
        username: 'vivek',
        email: 'vivek@example.com',
        age: 21,
    })
    res.send(user)
})

app.get('/create-post', async (req, res) => {
    const post = await postModel.create({
        postdata: 'hello world',
        userId: '6aee90e74e5cf637e98c1e3d'
    })

    const user = await userModel.findById('6aee90e74e5cf637e98c1e3d');
    user.posts.push(post._id);
    await user.save();
    res.send({post, user});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})