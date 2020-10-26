const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    try {
        req.user = jwt.verify(token, config.SecretKey);
        next();
    }
    catch (ex) {
        res.status(401).send('Invalid Token');
    }
}