require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const app = express();

app.use('/api', routes);

app.get('*', (request, response) => {
  return response.send('Smoke test');
});

module.exports = app;
