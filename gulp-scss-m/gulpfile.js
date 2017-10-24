'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins'); //此插件将gulp开头的插件整合成一个集合直接调用，无需在gulpfile里require即可使用
var runSequence = require('run-sequence'); //
var browserSync = require('browser-sync').create(); //构建本地服务器  //create()创建实例
var reload = browserSync.reload; //在修改html时进行reload,css进行重载
var tinypng = require('gulp-tinypng-compress');      //压缩图片2 需要有KEY,下面有将怎样获取KEY值

var plugins = gulpLoadPlugins(); //获取gulp插件集合以gulp-sass为例，plugins.sass即可调用
var pngquant = require('imagemin-pngquant');

const dist = './dist/'; //发布目录——全部压缩等处理后打包到此目录，本次打包忽略
const build = './build/'; //整合目录——本次打包，打包可不必全部压缩合并，按需处理
const src = './src/'; //源目录
const rev = './rev/'; //rev.json列表


/* 构建本地服务器 */
gulp.task("browser", function() {
  browserSync.init({
    files: ['**'],
    server: {
      baseDir: './build', // 设置服务器的根目录  //未打包之前切页面，将目录改成 ./src
      index: '/view/checkbox.html' // 指定默认打开的文件
    },
    port: 8090, // 指定访问服务器的端口号
  });

  // gulp.watch(src + 'sass/**/*.scss', ['sass']);
  // gulp.watch(src + 'view/*.html').on('change', reload);
  // gulp.watch(src + 'js/*.js').on('change', reload);
});
/* clean */
//每次重新构建之前删除build旧文件
gulp.task("clean", function() {
  return gulp.src('build', {read: false})
  .pipe(plugins.clean());
});
/* DEV */
//打包task   runSequence用于异步执行任务，如下会先执行 clean\再依次执行sass\revCss
gulp.task('dev', function(done) {
  //condition=false;
  runSequence(
    ['clean'],
    ['sass'],
    ['revCss'],
    ['revJs'],
    ['icon'],
    ['image'],
    ['revHtml'],
    ['browser'],
    done);
});
/* REV HTML */
gulp.task('revHtml', function() {
  return gulp.src(['rev/**/*.json', src + 'view/*.html'])
  .pipe(plugins.revCollector())
  .pipe(gulp.dest(build + 'view'));
});
/* REV CSS */
gulp.task('revCss', function() {
  return gulp.src(src + 'css/**/*.css')
  .pipe(plugins.rev())
  .pipe(gulp.dest(build + 'css'))
  .pipe(plugins.rev.manifest())
  .pipe(gulp.dest(rev + 'css'));
});
/* REV js */
gulp.task('revJs', function() {
  return gulp.src(src + 'js/**/*.js')
  .pipe(plugins.rev())
  .pipe(gulp.dest(build + 'js'))
  .pipe(plugins.rev.manifest())
  .pipe(gulp.dest(rev + 'js'));
});
/* ICONFONT */
gulp.task('icon', function() {
  return gulp.src(src + 'iconfont/**/*')
  .pipe(gulp.dest(build + 'iconfont'));
});
/* IMAGE ..还可以用imagemin-pngquant深度压缩配合*/
gulp.task('image', function() {
  return gulp.src(src + 'images/**/*')
  .pipe(gulp.dest(build + 'images'))
  .pipe(plugins.imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
    use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
  }))
  .pipe(gulp.dest(build + 'images'));
});
// gulp.task('image', function() {
//   return gulp.src(src + 'images/**/*')
//   .pipe(gulp.dest(build + 'images'))
//   .pipe(tinypng({
//     key: 'D9PHUrw3DSzUlEKg9C460Ue2_6SArpiS',
//     sigFile: build + 'images.tinypng-sigs',
//     log: true
//   }))
//   .pipe(gulp.dest(build + 'images'));
// });
// gulp.task('image', function() {
//   return gulp.src(src + 'images/**/*')
//   .pipe(gulp.dest(build + 'images'))
//   .pipe(plugins.tinypngNokey())
//   .pipe(gulp.dest(build + 'images'));
// });
/* SASS ,outputStyle是node-sass的一个属性值来定义样式输出的排版格式*/
gulp.task('sass', function() {
  return gulp.src(src + 'sass/**/*.scss')
  .pipe(plugins.autoprefixer({
    browsers: [
      'last 2 versions',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ],
    cascade: false
  }))
  .pipe(plugins.sass({outputStyle: 'compact'}).on('error', plugins.sass.logError))
  .pipe(gulp.dest(src + 'css'))
  .pipe(reload({stream: true}));
});
/* SASS WATCH */

//gulp.task("default",['sass','sass:watch']);
// gulp.task("default", ['sass', 'browser']);
gulp.task('default',['dev']);
