cp = require('child_process');
  module.exports = function(gulp, plugins, config) {
    gulp.task('file-copy', function() {
    return gulp.src(config.filesSrcPath)
      .pipe(plugins.copy(config.filesSrcDest, {prefix: 3}));
      });
  };
