'use strict';

/**
 * Compile Client Typescript sources
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = typescript.createProject('tsconfig.json', { sourceRoot: undefined });


var tsSources = [
     './node_modules/angular2/typings/**/*.ts',
    './client/app/**/*.ts',
];



module.exports = function () {
    var tsResult = gulp.src(tsSources)
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('../map'))
        .pipe(gulp.dest('./client/build/'));
};

// 
// module.exports = function () {
//     var tsResult = gulp.src(tsSources)
//         .pipe(sourcemaps.init())
//         .pipe(typescript(tsProject));
// 
//     return tsResult.js
//         .pipe(concat('app.js'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('client/'));
// };
