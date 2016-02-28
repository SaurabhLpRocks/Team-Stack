/// <reference path="./server.d.ts" />
'use strict';

var config = require('./config/environment');
var auth = require('./config/middlewares/authorization');

module.exports = function(app, passport) {

    // API
    app.use('/api/users', require('./api/user'));

    // Auth
    app.use('/auth', require('./auth'));

    app.route('/:url(api|app|bower_components|assets)/*')
        .get(function(req, res) {
            res.status(404).end();
        });

    app.route('/*')
        .get(function(req, res) {
            res.sendFile(
                app.get('appPath') + '/index.html', {
                    root: config.root
                });
        });

};
