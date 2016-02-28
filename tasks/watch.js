'use strict'

/**
 * Watch files, and do things when they changes.
 * Recompile scss if needed.
 * Reinject files
 */

var gulp = require('gulp')
var livereload = require('gulp-livereload')
var watch = require('gulp-watch')
var inject = require('gulp-inject')
var plumber = require('gulp-plumber')
var sass = require('gulp-sass')
var bowerFiles = require('main-bower-files')

var toInject = require('./config/filesToInject')
var toExclude = require('./config/bowerFilesToExclude')

module.exports = function () {
  livereload.listen()

  gulp.watch('bower.json', function () {
    gulp.src('client/index.html')
      .pipe(inject(gulp.src(bowerFiles(), { read: false }), {
        name: 'bower',
        relative: 'true',
        ignorePath: toExclude
      }))
      .pipe(gulp.dest('client'))
  })

  watch([
    'client/styles/**/*.scss',
    'client/views/**/*.scss',
    'client/directives/**/*.scss'
  ], function () {
    gulp.src('client/styles/app.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('client/styles/css'))
      .pipe(livereload())
  })

  var tsClientSources = [
    'client/app.ts',
    'client/app.d.ts',
    'client/animations/*.ts',
    'client/directives/**/*.ts', '!client/directives/**/*.spec.ts',
    'client/filters/**/*.ts', '!client/filters/**/*.spec.ts',
    'client/services/**/*.ts', '!client/services/**/*.spec.ts',
    'client/views/**/*.ts', '!client/views/**/*.spec.ts', '!client/views/**/*.e2e.ts'
  ]

  var tsServerSources = [
    'server/**/*.ts'
  ]

  var lastInjection = Date.now()

  watch(['client/app.js'], function () {
    if (Date.now() - lastInjection < 100) { return; }
    lastInjection = Date.now()
    gulp.src('client/index.html')
      .pipe(inject(gulp.src(toInject), { relative: true }))
      .pipe(gulp.dest('client'))
  })

  watch(tsClientSources, function () {
    gulp.run('typescript-client')
  })
  watch(tsServerSources, function () {
    gulp.run('typescript-server')
  })
  watch('client/app/**/*.html', function () {
    gulp.run('html')
  })
  watch(['client/index.html', 'client/app.js'], livereload.changed)

}
