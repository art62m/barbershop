const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

function lessCompilation() {
    return gulp.src('./less/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('.'))    
  /*  .pipe(cleanCSS({
        level: 2
    }))*/
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
};

function watch1() {
    browserSync.init({
       server: {
           baseDir: "."
       } 
    });
    gulp.watch('less/**/*.less', lessCompilation);
    gulp.watch('*.html').on('change', browserSync.reload);
};

gulp.task('less', lessCompilation);
gulp.task('watch', watch1);
