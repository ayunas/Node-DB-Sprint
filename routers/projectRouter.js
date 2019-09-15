const express = require('express');
const projectRouter = express.Router();
const DBHelper = require('../data/db-model');

projectRouter.get('/', (req,res) => {
    DBHelper.get('projects')
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json(err.message))
})

projectRouter.get('/:id',  (req,res) => {
    DBHelper.getByID(req.params.id, 'projects')
    .then(async project => {
        if (project.length) {
            let resources = await DBHelper.get('resources');
            resources = resources.filter(resource => resource.project_id == req.params.id);
            let tasks = await DBHelper.get('tasks');
            tasks = tasks.filter(task => task.project_id == req.params.id);
            res.status(200).json({...project, tasks, resources});
        } else {
            res.status(404).json({missing : `Project with id #: ${req.params.id} not found`})
        }
    })
    .catch(err => res.status(500).json(err.message))
})

module.exports = projectRouter;

