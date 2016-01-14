module.exports = function(gulp, plugins, config) {
gulp.task('watch', function () {
     // Builds JavaScript
     plugins.watch(config.jsSrcPath + '/**/*.js', function () {
         gulp.start('js-uglify');
     });

     // Builds CSS
     plugins.watch(config.scssSrcPath + '/**/*.scss', function () {
         gulp.start('sass-compile');
     });

     // Optimizes Images
     plugins.watch([config.imgSrcPath + '/**/*.jpg', config.imgSrcPath + '/**/*.png', config.imgSrcPath + '/**/*.svg'], function () {
         gulp.start('image-minification');
     });
});
};