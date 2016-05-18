var cp = require('child_process');

module.exports = function(gulp, plugins, config) {
/**
 * Build the Jekyll Site
 */
gulp.task('build-jekyll', function(done) {

  return cp.spawn('bundle', ['exec', 'jekyll', 'serve', '-q', '--source=' + config.jekyllSrc, '--destination=' + config.jekylldest, '--config=' + config.jekyllConfig], { stdio: 'inherit' })
  .on('close', done);


});

// gulp.task('jekyll-rebuild', ['build-jekyll'], function() {
//   plugins.browsersync.reload();
// });

};
