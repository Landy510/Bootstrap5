var gulp = require('gulp');
var concat = require('gulp-concat');
var uglyfly = require('gulp-uglyfly');
var sass = require('gulp-sass');
var vendorJS = ['bower_components/jquery/dist/jquery.js']
var ghPages = require('gulp-gh-pages'); 
sass.complier = require('node-sass');

gulp.task('concat', function () {
  return gulp.src('./source/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglyfly()) 
    .pipe(gulp.dest('./public/javascripts'))
})

gulp.task('sass', function () {
  return gulp.src('./source/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'))
})

gulp.task('vendor', function () {
  return gulp.src(vendorJS)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/javascripts'))
})

gulp.task('watch', function () {
  gulp.watch('./source/js/**/*.js', gulp.series('concat'))
  gulp.watch('./source/stylesheets/**/*.scss', gulp.series('sass')) 
})

gulp.task('deploy', function () {
  return gulp.src('./public/**/*')
    .pipe(ghPages())
})

gulp.task('default', gulp.series(['concat', 'sass', 'vendor', 'watch']))