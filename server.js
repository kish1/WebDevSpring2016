var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');

var connectionString = 'mongodb://127.0.0.1:27017/webdev';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));
app.use(express.static(process.env.IMAGES_ROOT));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var assignUserModel = require("./public/assignment/server/models/user.model.js")(db, mongoose);
var projectUserModel = require("./public/project/server/models/user.model.js")(db, mongoose);
require("./public/security.js")(app, assignUserModel, projectUserModel);

require("./public/assignment/server/app.js")(app, db, mongoose, assignUserModel);
require("./public/project/server/app.js")(app, db, mongoose, projectUserModel);

//console.log(app.routes);
app.listen(port, ipaddress);