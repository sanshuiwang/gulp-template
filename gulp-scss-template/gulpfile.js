'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins'); //�˲����gulp��ͷ�Ĳ�����ϳ�һ������ֱ�ӵ��ã�������gulpfile��require����ʹ��
var runSequence = require('run-sequence'); //
var browserSync = require('browser-sync').create(); //�������ط�����  //create()����ʵ��
var reload = browserSync.reload; //���޸�htmlʱ����reload,css��������

var plugins = gulpLoadPlugins(); //��ȡgulp���������gulp-sassΪ����plugins.sass���ɵ���

const dist = './dist/'; //����Ŀ¼����ȫ��ѹ���ȴ����������Ŀ¼�����δ������
const build = './build/'; //����Ŀ¼�������δ��������ɲ���ȫ��ѹ���ϲ������账��
const src = './src/'; //ԴĿ¼
const rev = './rev/'; //rev.json�б�

/* �������ط����� */
gulp.task("browser", function() {
  browserSync.init({
    files: ['**'],
    server: {
      baseDir: './build', // ���÷������ĸ�Ŀ¼  //δ���֮ǰ��ҳ�棬��Ŀ¼�ĳ� ./src
      index: '/view/checkbox.html' // ָ��Ĭ�ϴ򿪵��ļ�
    },
    port: 8090, // ָ�����ʷ������Ķ˿ں�
  });

  gulp.watch(src + 'sass/**/*.scss', ['sass']);
  gulp.watch(src + 'view/*.html').on('change', reload);
  gulp.watch(src + 'js/*.js').on('change', reload);
});
/* clean */
//ÿ�����¹���֮ǰɾ��build���ļ�
gulp.task("clean", function() {
  return gulp.src('build', {read: false})
  .pipe(plugins.clean());
});
/* DEV */
//���task   runSequence�����첽ִ���������»���ִ�� clean\������ִ��sass\revCss
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
/* IMAGE ..��������imagemin-pngquant���ѹ�����*/
gulp.task('image', function() {
  return gulp.src(src + 'images/**/*')
  .pipe(gulp.dest(build + 'images'))
  .pipe(plugins.imagemin())
  .pipe(gulp.dest(build + 'images'));
});
/* SASS ,outputStyle��node-sass��һ������ֵ��������ʽ������Ű��ʽ*/
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
