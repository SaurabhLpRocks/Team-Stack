'use strict';

var gulp = require('gulp'),
    sq   = require('run-sequence');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task('default',    function (cb) { sq('typescript', 'serve', cb); });
gulp.task('clean-client',        require('./tasks/clean-client.js'));
gulp.task('html',        require('./tasks/html'));
gulp.task('typescript-client',        require('./tasks/typescript-client'));
gulp.task('typescript-server',        require('./tasks/typescript-server'));
gulp.task('typescript', ['clean-client','html','typescript-client', 'typescript-server']);
gulp.task('serve',      ['watch'],    require('./tasks/serve').nodemon);
gulp.task('watch',      ['inject'],   require('./tasks/watch'));
gulp.task('inject',     ['sass'],     require('./tasks/inject'));
gulp.task('sass',                     require('./tasks/sass'));
gulp.task('preview',    ['build'],    require('./tasks/preview'));
gulp.task('build',                    require('./tasks/build'));
gulp.task('bump',       ['version'],  require('./tasks/chore').bump);
gulp.task('version',                  require('./tasks/chore').version);
gulp.task('sassdoc',                  require('./tasks/doc').sassdoc);
gulp.task('apidoc',                   require('./tasks/doc').apidoc);
// gulp.task('electron',                 require('./tasks/electron'));
