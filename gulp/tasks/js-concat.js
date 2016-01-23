module.exports = function(gulp, plugins, config) {

gulp.task('js-concat', ['js-uglify'], function() {


  return gulp.src(
      [
      
      config.jsSrcPath + '/*.js'
      ])


.pipe(plugins.uglify())



    .pipe(plugins.concat('scripts-concatenated.min.js')) //change this to change the script found in 'templates/global/_scripts.html'
    .pipe(gulp.dest(config.jsDistConcatPath))
});

}