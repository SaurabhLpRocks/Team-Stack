var gulp = require('gulp');
module.exports = function () {
    return gulp.src(['./client/app/**/**','!./client/app/**/*.ts'])
        .pipe(gulp.dest('./client/build'));
};