const express = require('express')
const app = express();
const router = express.Router()

app.use((req, res, next)=>{
    console.log('Application level Middleware working');
    next()
})

router.use((req, res, next)=>{
    console.log('Router level middleware working');
    next();
})

app.get('/', function(req, res){
    res.send('Home page')
})

app.get('/about', (req, res)=>{
    res.send('About page')
})

router.get('/profile', (req, res)=>{
    res.send('Profile Page')
})

app.use('/user', router) // base prefix for router
// now router level middleware works for localhost:3000/user/profile or /user/anyRouter you created

app.get('/services', (req, res)=>{
    return next(new Error('Not Implemented'))
})

app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).json({error: 'Something went wrong'})
})

app.listen(3000, function(){
    console.log('server is listening')
})