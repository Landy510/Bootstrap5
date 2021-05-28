const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const minimist = require('minimist'); // 用來讀取指令轉成變數
const gulpSequence = require('gulp-sequence').use(gulp);
const gulpif = require('gulp-if');
const cleanCSS = require('gulp-clean-css'); // 載入 gulp-clean-css 套件

// production || development
// # gulp --env production
const envOptions = {
  string: 'env',
  default: { env: 'development' }
};
const options = minimist(process.argv.slice(2), envOptions);
console.log(options);

gulp.task('clean', () => {
  return gulp
    .src(['./public', './.tmp'], { read: false, allowEmpty: true }) // 選項讀取：false阻止gulp讀取文件的內容，使此任務更快。
    .pipe($.clean());
});

gulp.task('vendorJs', function () {
  return gulp.src([
    './bower_components/jquery/dist/jquery.slim.min.js',
    './bower_components/bootstrap/dist/js/bootstrap.bundle.min.js'
  ])
  .pipe($.concat('vendor.js'))
  .pipe(gulp.dest('./public/javascripts'))
})

gulp.task('sass', function () {
  
  return gulp.src(['./source/stylesheets/**/*.sass', './source/stylesheets/**/*.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({ 
      outputStyle: 'nested',
      includePaths: ['./node_modules/bootstrap/scss']
    })
      .on('error', $.sass.logError))
    .pipe($.postcss([autoprefixer()]))
    .pipe(gulpif(options.env === 'production', cleanCSS())) // 假設開發環境則壓縮 CSS
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('copy', function () {
  return gulp.src(['./source/**/**', '!source/stylesheets/**/**'])
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function (done) {
  browserSync.init({
    server: { baseDir: './public' },
    reloadDebounce: 2000
  });
  done();
});

gulp.task('watch', function () {
  gulp.watch(
    ['./source/stylesheets/**/*.sass', './source/stylesheets/**/*.scss'],
    gulp.series('sass')
  );
  gulp.watch(
    ['./source/**/**', '!/source/stylesheets/**/**'],
    gulp.series('copy')
  );
});

gulp.task('deploy', function () {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
});

// gulp.task('sequence', gulpSequence('clean', 'copy', 'sass', 'vendorJs', 'sass'));

// gulp.task('default', ['copy', 'sass', 'vendorJs', 'browserSync', 'watch']);

// // gulp.task('build', ['sequence'])
gulp.task(
  'default',
  gulp.series('copy', 'sass', 'vendorJs', 'browserSync', 'watch')
);

gulp.task('build', gulp.series('clean', 'copy', 'sass', 'vendorJs', 'sass'));