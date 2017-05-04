
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

app.get('/api/v1/folders', (request, response) => {
  database('folders').select()
    .then(folders => response.status(200).json(folders))
    .catch(error => console.error('error: ', error))
});

app.get('/api/v1/urls', (request, response) => {
  database('urls').select()
  .then(urls => response.status(200).json(urls))
  .catch(error => console.error('error: ', error))
});

app.post('/api/v1/folders', (request, response) => {
  const folder = request.body;

  database('folders').insert(folder, 'id')
    .then(folder => {
      response.status(201).json({ id: folder[0], title: request.body.title })
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

app.get('/api/v1/folders/:folder_id/urls', (request, response) => {
  database('urls').where('folder_id', request.params.folder_id).select()
    .then(urls => {
      response.status(200).json(urls);
    })
    .catch(error => {
      console.error('error: ', error)
    })
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  });
}

//
// // FOLDERS
// app.get('/api/folders', (request, response) => {
//   const folders = app.locals.folders;
//   response.json({ folders })
// });
//
// app.post('/api/folders', (request, response) => {
//   const { title } = request.body;
//   const id = md5(title);
//
//   if (!title) {
//     return response.status(422).send({
//       error: 'No Folder Title was provided.'
//     })
//   }
//
//   app.locals.folders[id] = title
//   response.status(201).json({ id, title })
// });
//
// app.get('/api/folders/:id', (request, response) => {
//   const { id } = request.params
//   const title = app.locals.folders[id]
//
//   if (!title) { return response.sendStatus(404) }
//
//   response.json({ id, title })
// });
//
// app.listen(app.get('port'), () => {
//   console.log(`${app.locals.title} is running on ${app.get('port')}.`)
// });
//
//
