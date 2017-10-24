var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var scss = require('gulp-sass');
// --- 添加了更改文件浏览器内容自动更新 ---
// 静态服务器
gulp.task('browser-sync', function() {
  browserSync.init({
    files: ['**'],
    server: {
      baseDir: "./src",
      index: "/view/index.html"
    },
    port: 8090,
    open: false
  });

  gulp.watch("./src/scss/*.scss", ['build-scss']);
  gulp.watch("./src/view/*.html").on('change', reload);
  gulp.watch("./src/js/*.js").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('build-scss', function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(scss().on('error', scss.logError))
        .pipe(gulp.dest("./src/css/"))
        .pipe(reload({stream: true}));
});

gulp.task('default',['build-scss','browser-sync']);
