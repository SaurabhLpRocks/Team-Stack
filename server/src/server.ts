/*!
 * Team-Stack
 * Copyright(c) 2016 Saurabh Palatkar (https://github.com/SaurabhLpRocks), Rhushikesh Lokhande (https://github.com/rhushi-lokhande)
 * GNU Licensed
 */

/**
 * Typings dependencies
 */
/// <reference path="./server.d.ts" />

'use strict';
/**
 * Module dependencies
 */
var express = require('express');
var chalk = require('chalk');
var config = require('./config/environment');
var mongoose = require('mongoose');
//var passport = require('passport');

mongoose.connect(config.mongo.uri, config.mongo.options);

var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io')(server, { serveClient: true });
require('./config/sockets.js')(socket);

// Bootstrap routes
//require('./config/passport')(passport);
require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function() {

    console.log(
        chalk.red('\nExpress server listening on port ')
        + chalk.yellow('%d')
        + chalk.red(', in ')
        + chalk.yellow('%s')
        + chalk.red(' mode.\n'),
        config.port,
        app.get('env')
    );

    if (config.env === 'development') {
        require('ripe').ready();
    }

});

module.exports = server;
