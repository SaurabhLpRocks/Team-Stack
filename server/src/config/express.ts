/// <reference path="../server.d.ts" />
'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var multer = require('multer');
var winston = require('winston');
var config = require('./environment');

// Auth purpose
var session = require('express-session');
var passport = require('passport');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

/**
 * Expose
 */
module.exports = function(app) {

    var env = config.env;

    //Compression middleware (should be placed before express.static)
    //The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.
    app.use(compression({
        //The byte threshold for the response body size before compression is considered for the response, defaults to 1kb. 
        threshold: 512
    }));


    //app.use(passport.initialize());
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(multer().array('image', 1));

    app.set('view engine', 'html');
    //The extended option allows to choose between parsing the URL-encoded data 
    //with the querystring library (when false) or the qs library (when true).
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    // CookieParser should be above session
    app.use(cookieParser());
    app.use(cookieSession({ secret: config.secrets.cookie }));
    app.use(compression());
    //app.use(morgan('dev'));
    //app.use(passport.initialize());
    app.use(express.static(path.join(config.root, 'client/build')));
    app.use(express.static(path.join(config.root, 'node_modules')));
    app.set('appPath', 'client/build');

   

    // use passport session
    app.use(passport.initialize());
    app.use(session({
        secret: config.secrets.session,
        resave: true,
        saveUninitialized: true,
        store: new mongoStore({ mongooseConnection: mongoose.connection })
    }));


    // Use winston on production
    //var log = 'dev';
    var log;
    if (env !== 'development') {
        log = {
            stream: {
                write: message => winston.info(message)
            }
        };
    } else if (env === 'development') {
        log = 'dev'
    }    
    // Don't log during tests
    // Logging middleware
    if (env !== 'test') app.use(morgan(log));

    if (env === 'development' || env === 'test') {
        app.use(require('errorhandler')());
    }

    if (env !== 'test') {
        app.use(csrf());

        // This could be moved to view-helpers :-)
        app.use(function(req, res, next) {
            res.locals.csrf_token = req.csrfToken();
            next();
        });
    }
};
