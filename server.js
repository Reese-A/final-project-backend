const express = require('express');

const app = express();

app.get('*', (request, response) => {
  response.send('Smoke test');
})

module.exports = app;