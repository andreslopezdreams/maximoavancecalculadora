var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var nested = require('postcss-nested');
var atImport = require("postcss-import");
var concat = require('gulp-concat');
var cssnano = require('cssnano');
var notify = require('gulp-notify');
var gulp = require('gulp');


gulp.task('css', function () {
    var processors = [
        cssnext({browsers: ['last 1 version'], warnForDuplicates: false }),
        nested(),
        atImport(),
        cssnano()
    ];
    return gulp.src('./_cssnext/*.css')
        .pipe(concat('main.min.css'))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./assets/css'))
        .pipe(notify({ message: 'Tarea Post css completa' }));
});

gulp.task('watch', function () {
    gulp.watch('_cssnext/*.css', ['css']);
});

gulp.task('default', ['watch']);
