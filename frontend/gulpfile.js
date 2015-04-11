var gulp = require('gulp');

// node file system
var fs = require('fs');


// Include Our Plugins
var util      = require('gulp-util'),
  jshint      = require('gulp-jshint'),
  sass        = require('gulp-sass'),
  rename      = require('gulp-rename'),
  clean       = require('gulp-clean'),
  swig        = require('gulp-swig'),
  minifycss   = require('gulp-minify-css'),
  liveReload  = require('gulp-livereload'),
  include     = require('gulp-include'),
  runSequence = require('run-sequence');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('../public/' + ASSETS_PATH + 'stylesheets/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('../public/' + ASSETS_PATH + 'stylesheets/'))
        .pipe(liveReload());
});

gulp.task('scripts', function() {
  return gulp.src([
      './assets/javascripts/main.js',
      './assets/javascripts/global.js'
    ])
    .pipe(include())
    .pipe(gulp.dest('../public/' + ASSETS_PATH + "javascripts/"))
    .pipe(liveReload());
});

gulp.task('img', function(){
  return gulp.src('./assets/images/**/*.*')
    .pipe(gulp.dest('../public/' + ASSETS_PATH + 'images'))
    .pipe(liveReload());
});

// Compile Templates
gulp.task('index', function(){
  gulp.src('./assets/index.html')
    .pipe(swig({
      defaults: {
        cache: false,
        locals: {
          asset_path: ASSETS_PATH,
        }
      },
      setup: function(swig){
        swig.setFilter("assetPath", assetPath);
      }
    }))
    .pipe(gulp.dest('../public/'))
    .pipe(liveReload());
});

// Move fonts
gulp.task('fonts', function(){
  return gulp.src('./assets/fonts/**/*.*')
    .pipe(gulp.dest('../public/' + ASSETS_PATH + 'fonts'))
    .pipe(liveReload());
});

// Clean build
gulp.task('clean', function() {
  return gulp.src([
      '../public'
    ])
    .pipe(clean({force: true}));
});

// Watch Files For Changes
gulp.task('watch', function() {
  liveReload.listen();

  gulp.watch('./assets/javascripts/main.js', ['lint', 'scripts']);
  gulp.watch('./assets/scss/*.scss', ['sass']);
  gulp.watch(['./assets/html/**/*.html', "./assets/index.html"], ['index']);

  gulp.watch([
    './assets/**'
    ]).on('change', liveReload.changed);
});

gulp.task ("reload", function(){
  runSequence(["watch", "js", "sass", "images", "fonts"]);
});

gulp.task('default', function(){
  ASSETS_PATH = 'assets/';
  runSequence('clean', 'img', ['sass', 'scripts', 'fonts'], 'index', 'watch');
});

assetPath = function (input) {
  return "/bh/" + ASSETS_PATH + input;
};