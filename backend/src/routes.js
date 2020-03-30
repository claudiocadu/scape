const express = require('express');

const organizadorController = require('./controllers/organizadorController');
const eventoController = require('./controllers/eventoController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();


routes.post('/session', sessionController.create);

routes.get('/organizador', organizadorController.index);
routes.post('/organizador', organizadorController.create);

routes.get('/evento', eventoController.index);
routes.post('/evento', eventoController.create);
routes.delete('/evento/:id', eventoController.delete);

routes.get('/pro file', profileController.index);

 module.exports = routes;

 