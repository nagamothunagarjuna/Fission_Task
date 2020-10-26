const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    todo_name: String,
    todo_description: String,
    created_by: String
});

module.exports = mongoose.model('todo', todoSchema);