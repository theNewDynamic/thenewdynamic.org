module.exports = function(gulp, plugins, config) {
gulp.task('serve', ['build-jekyll'], function() {

  plugins.browserSync.init({
    server: {
        baseDir: '_site'
    },
    host: "localhost"

          });

  //gulp.watch(config.jekyllPath).on('change', plugins.browserSync.reload);

   });

  //  gulp.task('jekyll-rebuild', ['build-jekyll'], function() {
  //    plugins.browsersync.reload();
  //  });


};
