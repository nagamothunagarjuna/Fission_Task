const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const passwordComplexity = require("joi-password-complexity");
const mongoose = require('mongoose');
const { boolean } = require('joi');
const { default: joiPasswordComplexity } = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        isAdmin: this.isAdmin
    }, config.SecretKey);
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    })

    return schema.validate(user);
}

function validatePwdComplexity(user) {
    const complexityOptions = {
        min: 10,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4,
    };
    return passwordComplexity(complexityOptions).validate(user.password);
}

exports.User = User;
exports.validate = validateUser;
exports.validatePwd = validatePwdComplexity;