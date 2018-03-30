const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const connect = require('gulp-connect');

gulp.task('default', defaultTask);
gulp.task('style', buildStyle);
gulp.task('watch', watch);

function defaultTask(done) {
  gulp.src('./src/js/lcars-ux.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
  done();
}

function buildStyle(done) {
  gulp.src('./src/sass/lcars-ux.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
  done();
}

function watch(done) {
  gulp.watch('./src/sass/**/*.scss', ['style']);
  gulp.watch('./src/js/**/*.js', ['default']);
  connect.server({
    port: 8011,
    root: ['demo','dist']
  });
}
