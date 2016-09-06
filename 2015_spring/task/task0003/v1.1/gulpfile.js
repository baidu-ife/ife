//获取gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css'); // CSS压缩

// 合并，压缩js文件
gulp.task('minjs', function() {
  gulp.src('src/js/*.js')
    .pipe(amdOptimize('main'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// 合并、压缩、重命名css
gulp.task('mincss', function() {
  gulp.src(['src/css/*.css'])
    .pipe(concat('index.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['minjs', 'mincss']);