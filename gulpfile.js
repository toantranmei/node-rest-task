'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

var inputCss = './src/styles/*.scss';
var outputCss = './build/styles';
var inputJs = './src/scripts/*.js';
var outputJs = './build/scripts'

gulp.task('sass', function () {
    return gulp.src(inputCss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded',
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputCss))
        .pipe(browserSync.stream());
});

gulp.task('pack-css', function () {
    return gulp.src(['build/styles/main.css'])
        .pipe(concat('style.css'))
        .pipe(cleanCss())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/styles'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src(inputJs)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputJs))
        .pipe(browserSync.stream());
});

gulp.task('pack-js', function () {
    return gulp.src(['src/scripts/vendors/*.js', 'src/scripts/*.js'])
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(gulp.dest('build/scripts'))
        .pipe(browserSync.stream());
});

// Watch files for change and set Browser Sync
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'build'
        },
    })
});
gulp.task('serve', ['browserSync', 'sass', 'pack-css', 'scripts', 'pack-js'], function () {
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('build/styles/main.css', ['pack-css']);
    gulp.watch('src/scripts/*js', ['scripts']);
    gulp.watch('src/scripts/*.js', ['pack-js']);
    gulp.watch('build/**/*.html', browserSync.reload);
});
// Default task
gulp.task('default', ['serve']);