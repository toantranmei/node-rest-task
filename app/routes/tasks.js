const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import models
const Task = require('../models/tasks.model');

// GET Method
router.get('/', (req, res, next) => {
    Task.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                tasks: docs.map(doc => {
                    return {
                        name: doc.name,
                        description: doc.description,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8888/tasks/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// Show task within id of task
router.get('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    Task.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                // Single process, so don't make code without this blockcode
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
            
        })
        .catch(err => { 
            console.log(err) 
            res.status(500).json({
                error: err
            })
        });
});

// Show all task within id of project
router.get('/projects/:projectId', (req, res, next) => {
    console.log("Hello: " + req.params.projectId);
    Task.find(req.params.projectId)
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                count: docs.length,
                tasks: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        description: doc.description,
                        projectType: doc.projectType
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


// POST Method
router.post('/', (req, res, next) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        projectType: req.body.projectType
    });
    task.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /tasks',
                createdTask: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// PATCH Method {UPDATE}
router.patch('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Task.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// DELETE Method
router.delete('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    Task.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Task deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8888/tasks',
                    body: {
                        name: 'String',
                        description: 'String'
                    }
                }
            });
        })
        .catch(err => { 
            console.log(err) 
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;