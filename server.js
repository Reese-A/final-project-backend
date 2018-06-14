require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use('/api', routes);

app.get('*', (request, response) => {
  return response.send('Smoke test');
});

module.exports = app;
