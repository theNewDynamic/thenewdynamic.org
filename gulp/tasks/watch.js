module.exports = function(gulp, plugins, config) {
gulp.task('watch', function () {

//WIP

     // Builds JavaScript
     plugins.watch(config.jsSrcPath + '/**/*.js', function () {
         gulp.start('js-uglify');
     });

     plugins.watch(config.jsSrcPath + '/**/*.js', function () {
         gulp.start('js-concat',['js-uglify']);
     });

     // Builds CSS
     plugins.watch(config.scssSrcPath + '/**/*.scss', function () {
         gulp.start('sass-compile');
     });

     // Optimizes Images
     plugins.watch([config.imgSrcPath + '/**/*.jpg', config.imgSrcPath + '/**/*.png', config.imgSrcPath + '/**/*.svg'], function () {
         gulp.start('image-minification');
     });

    //  plugins.watch(config.jekyllPath, function () {
    //      gulp.start('build-jekyll');
    //  });


     //plugins.watch(sync.css).on('change', bs1.reload);
     //plugins.watch(sync.html).on('change', bs1.reload);
});
};