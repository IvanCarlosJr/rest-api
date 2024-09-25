const express = require('express');
const app = express();

const routeRepositories = require('./routes/repositories');

app.use('/repositories', routeRepositories);

app.use((req, res, next) => {
  const error = new Error('Rota não encontrada');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message
    }
  });
});

module.exports = app;