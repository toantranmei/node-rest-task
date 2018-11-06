const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    projectType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    } 
});

module.exports = mongoose.model('Task', taskSchema);