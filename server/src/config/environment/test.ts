/// <reference path="../../server.d.ts" />
'use strict';

module.exports = {
    ip: process.env.IP || undefined,
    server: {
        url: 'http://localhost:3000'
    },
    mongo: {
        uri: 'mongodb://localhost/Team-Stack-Test'
    },
    secrets: {
        session: process.env.SESSION_SECRET || 'secretKey',
        cookie: 'secret',
    },
    facebook: {
        clientID: '975041909195011',
        clientSecret: '6bcf8b64f80546cfd799a4f467cd1a20',
        callbackURL: '/auth/facebook/callback'//'/auth/facebook/callback'
    },
    twitter: {
        clientID: 'process.env.TWITTER_CLIENTID',
        clientSecret: 'process.env.TWITTER_SECRET',
        callbackURL: '/auth/twitter/callback'
    },
    github: {
        clientID: 'process.env.GITHUB_CLIENTID',
        clientSecret: 'process.env.GITHUB_SECRET',
        callbackURL: '/auth/github/callback'
    },
    linkedin: {
        clientID: 'process.env.LINKEDIN_CLIENTID',
        clientSecret: 'process.env.LINKEDIN_SECRET',
        callbackURL: '/auth/linkedin/callback'
    },
    google: {
        clientID: 'process.env.GOOGLE_CLIENTID',
        clientSecret: 'process.env.GOOGLE_SECRET',
        callbackURL: '/auth/google/callback'
    }
};
