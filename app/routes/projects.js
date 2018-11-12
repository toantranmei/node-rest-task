const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import module
const Project = require('../models/projects.model');


// GET Method
router.get('/', (req, res, next) => {
    Project.find()
        .select('task nameProject descProject _id')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                count: docs.length,
                projects: docs.map(doc => {
                    return {
                        _id: doc._id,
                        nameProject: doc.nameProject,
                        descProject: doc.descProject,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8888/projects' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.get('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID'
        })
    } else {
        res.status(200).json({
            message: 'You passed an ID',
            taskId: id
        })
    }
});

// POST Method
router.post('/', (req, res, next) => {
    const project = new Project({
        _id: mongoose.Types.ObjectId(),
        nameProject: req.body.nameProject,
        descProject: req.body.descProject,
        startTimeProject: req.body.startTimeProject,
        endTimeProject: req.body.endTimeProject,
        task: req.body.taskId
    });
    project
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// PATCH Method {UPDATE}
router.patch('/:projectId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated project!'
    });
});

// DELETE Method
router.delete('/:projectId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted project'
    });
});

module.exports = router;