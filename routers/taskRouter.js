const express = require('express');
const taskRouter = express.Router();
const DB = require('../data/db-model');

taskRouter.get('/', (req,res) => {
    DB.get('tasks')
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(500).json(err.message))
})

taskRouter.get('/:id', (req,res) => {
    DB.getByID(req.params.id, 'tasks')
    .then(task => res.status(200).json(task))
    .catch(err => res.status(500).json(err.message))
})

module.exports = taskRouter;