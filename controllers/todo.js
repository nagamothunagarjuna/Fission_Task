const express = require("express");
const todo = require('../models/todo_modal');
const exceptionHandler = require('../middleware/exceptionHandler');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const mongoose = require('mongoose');
const _lodash = require('lodash');
const router = express.Router();

router.post('/create', auth, exceptionHandler(async (req, res) => {
    const filter = { todo_name: req.body.todo_name };
    todo.find(filter)
        .exec()
        .then(async (result) => {
            if (result.length === 0) {
                const newtodo = new todo(_lodash.pick(req.body, ['todo_name', 'todo_description', 'created_by']));
                const result = await newtodo.save();
                res.status(200).send(_lodash.pick(result, ['todo_name', 'todo_description', 'created_by']));
            }
            else {
                res.status(200).send(`Duplicate Todo Name: ${req.body.todo_name}`);
            }
        });
}));

router.put('/update', auth, exceptionHandler(async (req, res) => {
    const filter = { todo_name: req.body.todo_name };
    const update = { todo_description: req.body.todo_description };
    const result = await order.findOneAndUpdate(filter, update, { new: true });
    res.status(200).send(_lodash.pick(result, ['todo_name', 'todo_description', 'created_by']));
}));

router.post('/list', auth, exceptionHandler(async (req, res) => {
    const result = await order.find({ todo_name: req.body.todo_name });
    res.status(200).json({ result });
}));

router.delete('/delete', [auth, admin], exceptionHandler(async (req, res) => {
    const result = await order.findOneAndRemove({ todo_name: req.body.todo_name });
    res.status(200).json({ result });
}));

module.exports = router;