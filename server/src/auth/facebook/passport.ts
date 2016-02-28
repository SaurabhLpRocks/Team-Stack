/// <reference path="../../server.d.ts" />
'use strict';

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../../config/environment');

exports.setup = function(User) {

    // serialize sessions
    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((id, cb) => User.load({ criteria: { _id: id } }, cb));

    // // used to serialize the user for the session
    // passport.serializeUser(function(user, done) {
    //     done(null, user); 
    //     "user.id"" saved to session req.session.passport.user = {id:'..'}
    // });
    // 
    // // used to deserialize the user
    // passport.deserializeUser(function(id, done) {
    //     User.findById(id, function(err, user) {
    //         done(err, user);
    //         //"user"" object attaches to the request as req.user.
    //     });
    // });

    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    }, function(accessToken, refreshToken, profile, done) {

        User.findOne({ 'facebook.id': profile.id }, function(err, user) {
            if (err)
                return done(err);

            if (!user) {
                var data = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    provider_id: profile.id,
                    provider: 'facebook',
                    facebook: profile._json
                };

                user = new User(data);
                user.save(function(err) {
                    return done(err, user);
                });

            } else
                return done(err, user);
        });
    }));
};
