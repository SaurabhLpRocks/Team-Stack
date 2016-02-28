'use strict';

var del = require('del');

module.exports = function () {
    del(['client/build/**', 'client/map/**']);
};