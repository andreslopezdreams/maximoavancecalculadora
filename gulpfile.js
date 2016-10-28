var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var nested = require('postcss-nested');
var atImport = require("postcss-import");

var gulp = require('gulp');

gulp.task('css', function () {
    var processors = [
        cssnext({browsers: ['last 1 version']}),
        nested(),
        atImport(),
    ];
    return gulp.src('./_cssnext/main.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('default', ['css']);

