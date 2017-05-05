# Jet Fuel

![recordit]()

[See it live!]https://jetfuelshorturl.herokuapp.com/()

Jet Fuel is a URL shortened application that was our first project building a backend in module 4. Jet Fuel allows users to create folders to store long, ugly URLs as shortened URLs. The main goal of this application is to redirect a request at the shortened URL to their longer URL equivalent. Each shortened URL belongs to a unique folder which is capable of storing any number of URLs. Our secondary goal is to track URL usage and provide popularity statistics.

[Original Assignment](http://frontend.turing.io/projects/jet-fuel.html)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#### Clone the repo: 
$ git clone git@github.com:becs919/jet-fuel.git

#### Install dependencies:
$ npm install 

#### Run server: 
$ node server.js 

Running on: 
http://localhost:3000/

### Prerequisites

Client-side: Javascript/jQuery 

Server-side: Postgres, Knex, Node.js, Express 

Testing: Mocha, Chai, Chaihttp

## Running the tests

Mocha/Chai were used in the testing of this application. 

$ mocha

## Deployment

We used Heroku for deployment of our application. 

[Jet-Fuel](https://jetfuelshorturl.herokuapp.com/)

## Design
![wireframe](http://i.imgur.com/kX9X3A7.png)

We focused our app heavily on the mobile view for the user and adapted that for the bigger screens. We wanted a very clean and straight forward look so the user could easily go in, see their folders and add links all day everyday.

If we had more time we would expand the app into being able to click on a folder that goes to its own page that displays its URLs, but always maintaining the header form so URLs can be added from anywhere in the app.

## Authors

* **Marissa Reinke** - *Initial work* - [Marissa27](https://github.com/marissa27)
* **Rebecca Holt** - *Initial work* - [Bec919](https://github.com/becs919) 
