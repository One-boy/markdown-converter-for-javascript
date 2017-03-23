
var gulp = require('gulp'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
jshint = require('gulp-jshint'),
notify = require('gulp-notify');

//js uglify
gulp.task('js-handler',function(){
    return gulp.src('src/md.js')
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dest'))
    .pipe(notify({message:'js处理完毕'}))
})

//watch js
gulp.task('watch',function(){
    gulp.watch('src/md.js',['js-handler']);
})

//default
gulp.task('default',function(){
    gulp.start('js-handler')
})