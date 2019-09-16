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

resourceRouter.post('/:projID', (req,res) => {
    const newResource = req.body;
    // newResource.project_id = req.params.projID;
    DB.addResToProj(newResource,req.params.projID)
    .then(([resource]) => {
        console.log('resource in router', resource);
        res.status(201).json(resource)})
    .catch(err => res.status(500).json(err.message));
})

module.exports = resourceRouter;