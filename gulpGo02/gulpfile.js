var gulp = require('gulp');

var react = require('gulp-react');
var babel = require('gulp-babel');

var less = require('gulp-less');
var sass = require('gulp-sass');
//--- react\es6进行转换
gulp.task('less',function(){
  return gulp.src('./src/cssLess.less')
  .pipe(less())
  .pipe(gulp.dest('./dest'));
});
gulp.task('sass',function(){
  return gulp.src('./src/css2.scss')
  .pipe(sass())
  .pipe(gulp.dest('./dest'));
});
gulp.task('default',['sass'],function(){
  return gulp.src('./src/myui.js')
  .pipe(react())
  .pipe(babel({
    presets: ['babel-preset-es2015']
  }))
  .pipe(gulp.dest('./dest'));
})
