const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');

const environment = process.env.NODE_ENV || 'development';
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

app.post('/api/v1/folders', (request, response) => {
  const folder = request.body;
  const title = request.body.title;

  if (!title) {
    response.status(422).send({
      error: 'You are missing data!'
    })
  } else {
    database('folders').insert(folder, 'id')
    .then(folder => {
        response.status(201).json({ id: folder[0], title: title })
    })
    .catch(error => {
      console.error('error: ', error);
    })
  }
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
    visited: 0,
    folder_id: request.params.folder_id
  };
  if (!urlObj.title) {
    response.status(422).send({
      error: 'You are missing data!'
    })
  } else {
    database('urls').insert(urlObj)
    .then(() => {
      database('urls').where('folder_id', request.params.folder_id).select()
        .then(url => {
          response.status(201).json(url);
        })
        .catch(error => {
        console.error('error: ', error)
      })
  })}
});

app.get('/:id', (request, response) => {
  database('urls').where('id', request.params.id).select()
  .then((urls => {
    // updateVisit(urls[0].id, urls[0].visited, urls[0].folder_id)
    response.redirect('http://' + urls[0].fullURL)
  }))
});

// :( FAILED ATTEMPT FOR PATCH FOR VISITED INCREMENTING
// updateVisit = (id, visits, folder_id) => {
//   console.log(id, visits);
//   app.patch(`/api/v1/folders/${folder_id}/urls/`, (request, response) => {
//     const url = request.body;
//     const urlObj = {
//       visited: visits++,
//     };
//     database('urls').insert(urlObj)
//     .then(() => {
//       database('urls').where('folder_id', request.params.folder_id).select()
//       .then(url => {
//         response.status(200).json(url);
//         console.log(url)
//       })
//       .catch(error => {
//         console.error('error: ', error)
//       })
//     })
//   });
// }

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  });
}

module.exports = app;
