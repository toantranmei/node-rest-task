const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameProject: { type: String, required: true },
    descProject: { type:String },
    startTimeProject: { type: Date },
    endTimeProject: { type: Date },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
});

module.exports = mongoose.model('Project', projectSchema);