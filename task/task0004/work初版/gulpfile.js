/*
 * gulpfile.js
 */

var gulp = require("gulp");

var less = require("gulp-less"),
    minifycss = require("gulp-minify-css"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    clean = require("gulp-clean"),
    uglify = require("gulp-uglify");

gulp.task("build-less", function() {
    return gulp.src("./css/less/file.less")
        .pipe(less())
        .pipe(gulp.dest("./css/temp/"));
});

gulp.task("stylesheets", ["build-less"], function() {
    gulp.src("./css/temp/*.css")
        .pipe(concat("app.css"))
        .pipe(gulp.dest("./css/"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(minifycss())
        .pipe(gulp.dest("./css"));

    gulp.src("./css/temp/**")
        .pipe(clean({
            force: true
        }));
});

// 合并，压缩js文件
gulp.task('javascripts', function() {
    
});

// 将bower的库文件对应到指定位置，不一定就是bower安装的库文件，其他不通过bower安装的库文件也可以的
gulp.task('buildlib', function () {
    
});

// 定义日常开发时通用的任务
gulp.task('develop', function(){
    gulp.run('stylesheets');

    // gulp.watch(['./css/less/*.less', './css/*.css'], function (e) {
    //     console.log('文件 ' + event.path + ' was ' + event.type + ', 发生了改动...');

    //     gulp.run('stylesheets');
    // });

});


// gulp命令默认启动的就是default,所以在default里执行(run)响应的任务。这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
gulp.task('default', function () {
    gulp.run('develop');
});
