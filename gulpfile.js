var gulp = require('gulp');
/**
 * Build all the jade templates.
 * @return {function}
 */
gulp.task('templates', function() {
  var jade = require('gulp-jade');
  gulp.src('./lib/templates/*.jade')
    .pipe(jade({
      client: true
    }))
    .pipe(gulp.dest('./build/'));
});