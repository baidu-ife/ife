/*
 * gulpfile.js
 */

var gulp = require("gulp");

var less = require("gulp-less"),
    minifycss = require("gulp-minify-css"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    clean = require("gulp-clean"),
    seajsCombo=require("gulp-seajs-combo"),
    uglify = require("gulp-uglify");

gulp.task("build-less", function() {
    return gulp.src("./css/less/file.less")
        .pipe(less())
        .pipe(gulp.dest("./build/css/src/"));
});

gulp.task("stylesheets", ["build-less"], function() {
    gulp.src(["./build/css/src/*.css", "./css/responsive.css"])
        .pipe(concat("app.css"))
        .pipe(gulp.dest("./build/css/"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(minifycss())
        .pipe(gulp.dest("./build/css/"));
});

gulp.task('build-seajs-module', function () {
    var steam=gulp.src('./js/app.js')
        .pipe(seajsCombo())
        .pipe(gulp.dest('./build/js/'));

    return steam;
});

gulp.task('javascripts', ['build-seajs-module'], function() {
    // gulp.src("./js/init.js")
    //     .pipe(uglify())
    //     .pipe(gulp.dest("./build/js/"));

    gulp.src("./build/js/app.js")
        .pipe(uglify({
            mangle: {
                except: ["require", "exports", "module"]
            }
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./build/js/"));
});

gulp.task('buildlib', function () {
    gulp.src("./js/lib/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./build/js/lib/"));
});

gulp.task('develop', function(){
    gulp.run('buildlib', 'stylesheets', 'javascripts');
});

gulp.task("clean", function () {
    var steam=gulp.src("./build")
        .pipe(clean({
            force: true
        }));
    return steam;
});

gulp.task('default', ["clean"], function () {
    gulp.run('develop');
});
