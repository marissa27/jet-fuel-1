const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');

const environment = 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.set('port', process.env.PORT || 3000);
app.locals.title = 'JetFuel';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (request, response ) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
});

// FOLDER METHODS
app.get('/api/v1/folders', (request, response) => {
  database('folders').select()
    .then(folders => response.status(200).json(folders))
    .catch(error => console.error('error: ', error))
});

app.post('/api/v1/folders', (request, response) => {
  const folder = request.body;
  const title = request.body.title;

  database('folders').insert(folder, 'id')
  .then(folder => {
    response.status(201).json({ id: folder[0], title: title })
  })
  .catch(error => {
    console.error('error: ', error);
  })
});

app.get('/api/v1/folders/:id', (request, response) => {
  database('folders').where('id', request.params.id).select()
  .then(folders => {
    response.status(200).json(folders);
  })
  .catch(error => {
    console.error('error: ', error)
  });
});

// URL METHODS
app.get('/api/v1/urls', (request, response) => {
  database('urls').select()
  .then(urls => response.status(200).json(urls))
  .catch(error => console.error('error: ', error))
});

app.get('/api/v1/folders/:folder_id/urls', (request, response) => {
  database('urls').where('folder_id', request.params.folder_id).select()
    .then(urls => {
      response.status(200).json(urls);
    })
    .catch(error => {
      console.error('error: ', error)
    })
});

app.post('/api/v1/folders/:folder_id/urls', (request, response) => {
  const url = request.body;
  const urlObj = {
    title: request.body.title,
    fullURL: request.body.fullURL,
    shortURL: md5('request.body.fullURL').slice(0,5),
    // visited: request.body.visited,
    visited: 0,
    folder_id: request.params.folder_id
  };
  database('urls').insert(urlObj)
  .then(() => {
    database('urls').where('folder_id', request.params.folder_id).select()
      .then(url => {
        response.status(201).json(url);
      })
      .catch(error => {
      console.error('error: ', error)
    })
  })
});


if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  });
}
