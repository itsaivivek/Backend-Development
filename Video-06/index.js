const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const { ifError } = require('assert');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function toPascalCase(str) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (c) => c.toUpperCase());
}


app.get('/', (req, res) => {
  fs.readdir('./tasks', (err, tasks) => {
    res.render('index', { tasks: tasks });
  })
});

app.get('/task/:taskname', (req, res) => {
  fs.readFile(`./tasks/${req.params.taskname}`, 'utf-8', (err, data) => {
    if (err) console.error(err)
    res.render('readMore', { taskname: req.params.taskname, taskDescription: data });
  }
  )
})

app.post('/create', (req, res) => {
  fs.writeFile(`./tasks/${toPascalCase(req.body.title.split(' ').join(''))}.txt`, req.body.description, (err) => {
    if (err) console.error(err)
  }
  )
  res.redirect('/')
}
)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});