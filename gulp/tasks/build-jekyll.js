cp = require('child_process');
module.exports = function(gulp, plugins, config) {


  // Rebuild Jekyll
  gulp.task('build-jekyll', (code) => {
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
      .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
      .on('close', code);
  })

  // Setup Server
  gulp.task('server', () => {
    connect.server({
      root: ['_site'],
      port: 4001
    });
  })


};
