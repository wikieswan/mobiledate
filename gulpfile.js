var gulp = require('gulp'),
    connect = require('gulp-connect');
var path = {};
path.root = './'
path.css = path.root + 'css/mobiledate.css';
path.js = path.root + 'js/mobiledate.js';
path.html = path.root + 'index.html';

gulp.task('connect', function() {
    connect.server({
        root: '../mobiledate/',
        port: 3000,
        livereload: true
    });
});

gulp.task('reload',function() {
    gulp.src([path.html,path.css,path.js])
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch([path.html,path.css,path.js],['reload']);
});

gulp.task('serve', function() {
    gulp.start(['connect', 'watch']);
});

gulp.task('default', ['serve']);












