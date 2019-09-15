const express = require('express');
const resourceRouter = express.Router();
const DB = require('../data/db-model')

resourceRouter.get('/', (req,res) => {
    DB.get('resources')
    .then(resources => {
        res.status(200).json(resources);
    })
    .catch(err => res.status(500).json(err.message))
})

resourceRouter.get('/:id', (req,res) => {
    DB.getByID(req.params.id, 'resources')
    .then(resource => {
        res.status(200).json(resource);
    })
    .catch(err => res.status(500).json(err.message))
})

module.exports = resourceRouter;