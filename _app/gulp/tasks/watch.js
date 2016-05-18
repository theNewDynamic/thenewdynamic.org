module.exports = function(gulp, plugins, config) {
gulp.task('watch', function () {

     // Builds JavaScript
     plugins.watch(config.scriptsWatch + '/**/*.js', function () {
         gulp.start('js-uglify', 'file-copy');
     });

     plugins.watch(config.scriptsWatch + '/**/*.js', function () {
         gulp.start('js-hint', ['js-uglify']);
     });


     // Builds CSS
     plugins.watch(config.scssSrc + '/**/*.scss', function () {
         gulp.start('sass-compile');
     });

     // Optimizes Images
     plugins.watch([config.imgSrcPath + '/*.jpg', config.imgSrcPath + '/*.png', config.imgSrcPath + '/*.svg'], function () {
         gulp.start('image-minification');
     });

     plugins.watch(config.jekyllSrc + '/*.*', function () {
         gulp.start('build-jekyll');
     });
     plugins.watch(config.jekyllSrc + '/*.*', function () {
         gulp.start('serve');
     });


     //plugins.watch(sync.css).on('change', bs1.reload);
     //plugins.watch(sync.html).on('change', bs1.reload);
});
};
