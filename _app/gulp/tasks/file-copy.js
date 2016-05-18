cp = require('child_process');
  module.exports = function(gulp, plugins, config) {
    gulp.task('file-copy', function() {

    gulp.src(config.filesSrcJs)
      .pipe(plugins.copy(config.filesSrcJsDest, {prefix: 3}));

    gulp.src(config.filesSrc)
      .pipe(plugins.copy(config.filesSrcDest, {prefix: 3}));
      });
  };
