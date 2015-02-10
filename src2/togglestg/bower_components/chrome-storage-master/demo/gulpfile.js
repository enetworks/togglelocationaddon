var gulp = require('gulp');
var path = require('path');
var vulcanize = require('gulp-vulcanize');
var polymports = require('gulp-polymports');

var configs = {
  components: path.join(__dirname, 'components')
};

gulp.task('imports', function() {
  return gulp.src([
    '../../polymer/**',
    ]).pipe(gulp.dest(path.join(configs.components, 'polymer')));
});

gulp.task('vulcanize', function() {
  return polymports.src(require('./components.json'))
  .pipe(vulcanize({
    dest: configs.components,
    csp: true,
    excludes: {
      imports: [
        "polymer.html$"
      ]
    }
  }))
  .pipe(gulp.dest(configs.components));
});

gulp.task('build', ['imports', 'vulcanize']);
