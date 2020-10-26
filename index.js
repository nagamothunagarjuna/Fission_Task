const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const Users = require('./controllers/Users');
const Auth = require('./controllers/auth');
const todo = require('./controllers/todo');
const config = require('./config/config.json');

if (!config.SecretKey) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(config.MongoDBConn, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.log('Could not connect to Database'));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
app.use('/api/users', Users)
app.use('/api/authenticate', Auth)
app.use('/api/todo', todo)

app.listen(port, (err) => {
    console.log("Server Listening on Port: " + port);
    console.log('Process ID: ' + process.pid);
});