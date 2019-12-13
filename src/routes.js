const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const TaskController = require('./controllers/TaskController');

//User Routes
routes.get('/users', UserController.show);
routes.post('/userfind', UserController.index);
routes.post('/user', UserController.store);
routes.put('/user', UserController.update);
routes.delete('/user', UserController.destroy);

//Task Routes
routes.get('/tasks', TaskController.index);
routes.post('/task', TaskController.store);
routes.put('/task', TaskController.update);
routes.delete('/task', TaskController.destroy);


module.exports = routes;