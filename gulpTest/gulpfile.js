var gulp = require('gulp');
var uglifg = require('gulp-uglify');
var concat = require('gulp-concat');
// var paths = {
//   scripts: ['js/index.js', 'js/main.js']
// }
// gulp.task('default', function() {
//   console.log("ok");
// });
gulp.task('default', function() {
  gulp.src('js/*.js').pipe(uglifg()).pipe(concat('all.min.js')).pipe(gulp.dest('build'));
});
