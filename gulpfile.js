var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass');
var path = {};
path.root = './'
path.css = path.root + 'css/mobiledate.css';
path.js = path.root + 'js/*.js';
path.html = path.root + '*.html';
path.scss = path.root + 'scss/*.scss'

gulp.task('connect', function() {
    connect.server({
        root: '../mobiledate/',
        port: 3000,
        livereload: true
    });
});

gulp.task('sass', function () {
  return gulp.src(path.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('reload',function() {
    gulp.src([path.html,path.css,path.js])
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch([path.html,path.css,path.js],['reload']);
    gulp.watch([path.scss],['sass','reload']);
});

gulp.task('serve', function() {
    gulp.start(['connect', 'watch']);
});

gulp.task('default', ['serve']);












