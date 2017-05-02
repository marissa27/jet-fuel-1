const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'JetFuel';

app.locals.folders = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (request, response ) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
});

app.get('/api/folders', (request, response) => {
  const folders = app.locals.folders;
  response.json({ folders })
});

app.post('/api/folders', (request, response) => {
  const { title } = request.body;
  const id = md5(title);

  if (!title) {
    return response.status(422).send({
      error: 'No Folder Title was provided.'
    })
  }

  app.locals.folders[id] = title
  response.status(201).json({ id, title })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

// var express = require('express');
// var app = express();
//
// app.use(express.static('public'));
//
// app.get('/', function (req, res) {
//    res.sendFile('index.html');
// })
//
// var server = app.listen(3000, function () {
//    var host = server.address().address
//    var port = server.address().port
//
//    console.log("Example app listening at http://%s:%s", host, port)
//
// })
