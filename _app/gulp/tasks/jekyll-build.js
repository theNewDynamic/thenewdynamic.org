var cp = require('child_process');
module.exports = function(gulp, plugins, config) {
  
  gulp.task('jekyll-build', function(done) {

    //plugins.browsersync.notify('Compiling Jekyll (Production)');

  return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--source=' + config.jekyllSrc, '--destination=' + config.jekylldest, '--config=' + config.jekyllConfig], { stdio: 'inherit' })
  //.on('error', (error) => plugins.gutil.log(gutil.colors.red(error.message)))
  .on('close', done);

  });

};
