var gulp = require('gulp');
// ---多个任务执行
gulp.task('test-one',function(){
  console.log('test one');
});
gulp.task('test-two',function(){
  console.log('test two');
});
gulp.task('default',['test-one','test-two'],function(){
  console.log('hello gulp');
});

//异步进行
// var exec = require('child_process').exec;
// gulp.task('jekyll',function(cb){
//   exec('jekyll build',function(err){
//     if (err) return cb(err);
//     cb();
//   });
// });
