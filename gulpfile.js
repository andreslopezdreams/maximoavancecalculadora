'use strict';

const postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    nested = require('postcss-nested'),
    atImport = require("postcss-import"),
    concat = require('gulp-concat'),
    cssnano = require('cssnano'),
    notify = require('gulp-notify'),
    gulp = require('gulp'),
    babel = require("gulp-babel"),
    uglify = require('gulp-uglify');


gulp.task('css', () => {
    var processors = [
        cssnext({browsers: ['last 1 version'], warnForDuplicates: false}),
        nested(),
        atImport(),
        cssnano()
    ];
    return gulp.src('./_cssnext/*.css')
        .pipe(concat('main.min.css'))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./assets/css'))
        .pipe(notify({message: 'Tarea Post css completa'}));
});

gulp.task('js', () => {

    return gulp.src('./_ecmascript/*.js')
        .pipe(concat('main.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('watch', () => {
    gulp.watch('_cssnext/*.css', ['css']);
    gulp.watch('./_ecmascript/*.js', ['js']);
});

gulp.task('default', ['watch']);
