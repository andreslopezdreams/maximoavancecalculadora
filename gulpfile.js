'use strict';

const postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    nested = require('postcss-nested'),
    atImport = require("postcss-import"),
    notify = require('gulp-notify'),
    gulp = require('gulp'),
    babel = require("gulp-babel"),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    fontMagician = require('postcss-font-magician'),
    connect = require('gulp-connect');


gulp.task('connect', () => {
    connect.server({
        root: __dirname,
        livereload: true
    });
});

gulp.task('css', () => {
    var processors = [
        atImport(),
        cssnext({browsers: ['last 1 version'], warnForDuplicates: false}),
        fontMagician(),
        nested()
    ];

    return gulp.src('./_cssnext/main.css')
        .pipe(postcss(processors))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(connect.reload())
        .pipe(notify({message: 'Tarea Post css completa'}));



});

gulp.task('js', () => {

    return gulp.src('./_ecmascript/main.js')
        .pipe(rename('main.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js'))
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch('_cssnext/*.css', ['css']);
    gulp.watch('./_ecmascript/*.js', ['js']);

});

gulp.task('default', ['connect', 'watch']);
