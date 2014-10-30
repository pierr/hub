var gulp = require('gulp');
/**
 * Build all the jade templates.
 * @return {function}
 */
gulp.task('templates', function() {
  var jade = require('gulp-jade');
  var wrapCommonjs = require('gulp-wrap-commonjs');
  gulp.src('./lib/templates/*.jade')
    .pipe(jade({
      client: true
    }))
    .pipe(wrapCommonjs({autoRequire: true, moduleExports: "template"}))
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