var gulp = require('gulp');
var concat = require('gulp-concat');
/**
 * Build all the jade templates.
 * @return {function}
 */
gulp.task('templates', function() {
  var jade = require('gulp-jade');
  var defineModule = require('gulp-define-module');
  gulp.src('./lib/templates/*.jade')
    .pipe(jade({  client: true}))
    .pipe(defineModule('commonjs'))
    .pipe(gulp.dest('./lib/templates/'));
});

gulp.task('browserify', ['templates'] ,function() {
  var browserify = require('browserify');
  var source = require('vinyl-source-stream');
  return browserify('./lib/index.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('hub.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('./example/'));
});

gulp.task('style', function(){
  var stylus = require('gulp-stylus');
  gulp.src('./lib/styles/*.styl')
    .pipe(stylus())
    .pipe(concat('hub.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('./example/'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify', 'style']);