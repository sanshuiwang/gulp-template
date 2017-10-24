var gulp = require('gulp');
var react = require('gulp-react');
var babel = require('gulp-babel');

var less = require('gulp-less');
var sass = require('gulp-sass');

var jasmine = require('gulp-jasmine');
var mocha = require('gulp-mocha');

//解析类似require()这样的语法的。所以我们需要Browserify
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
gulp.task('default',function(){
  return gulp.src('./src/main.js')
  .pipe(browserify())
  .pipe(uglify())
  .pipe(gulp.dest('./build'));
});


// gulp.task('mocha test', function(){
//   return gulp.src('./src/test2.js')
//   .pipe(mocha());
// });
// gulp.task('default',['mocha test'],function(){
//   return gulp.src('./src/test1.js')
//   .pipe(jasmine());
// });

// gulp.task('less',function(){
//   return gulp.src('./src/cssLess.less')
//   .pipe(less())
//   .pipe(gulp.dest('./dest'));
// });
// gulp.task('sass',function(){
//   return gulp.src('./src/css2.scss')
//   .pipe(sass())
//   .pipe(gulp.dest('./dest'));
// });
// gulp.task('default',['sass','less'],function(){
//   return gulp.src('./src/myui.js')
//   .pipe(react())
//   .pipe(babel({
//     presets: ['babel-preset-es2015']
//   }))
//   .pipe(gulp.dest('./dest'));
// })
