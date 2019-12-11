const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Task', TaskSchema);