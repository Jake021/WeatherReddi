const EXPRESS = require('express');
const CORS = require('cors');
const BODY_PARSER = require('body-parser');
const APP = EXPRESS();
const MONGOOSE = require('mongoose');
const PATH = require('path');

//Routes
const PROFILES_ROUTES = require('./routes/profiles');

APP.use(CORS());
APP.use(EXPRESS.json());

MONGOOSE.connect('mongodb+srv://admin:badresume69@cluster0.zox4n.mongodb.net/weatherReddi?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true })
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch(() => {
        console.log('Connection Failed');
    });

APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({ extended: false }));
    
APP.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});
    
APP.use('/api/profiles', PROFILES_ROUTES);
module.exports = APP;
    