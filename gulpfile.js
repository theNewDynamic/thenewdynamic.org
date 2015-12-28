'use strict';

var gulp     = require('gulp'),
    //browserSync = require('browser-sync').create(),
    concat   = require('gulp-concat'),
    jshint   = require('gulp-jshint'),
    minify   = require('gulp-minify-css'),
    rename   = require('gulp-rename'),

    uglify   = require('gulp-uglify'),

    watch = require('gulp-watch');






var CSSDest = './static/css/',
    JSDest = './static/js/dist/';

gulp.task('styles', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        // This will output the non-minified version
    .pipe(gulp.dest(CSSDest))
    // This will minify and rename to foo.min.js
    .pipe(minify())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(CSSDest));
});

gulp.task("lint", function() {
    gulp.src("./static/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task('scripts', function() {
  return gulp.src( './static/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(JSDest))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(JSDest))
});

gulp.task('scripts-concat', function() {
  return gulp.src(
      [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/flickity/dist/flickity.pkgd.min.js',
      'static/js/dist/scripts.min.js'
      ])
    .pipe(concat('scripts-concatenated.min.js')) //change this to change the script found in 'templates/global/_scripts.html'
    .pipe(gulp.dest(JSDest))
});



gulp.task('move-scripts', function(){
    return gulp.src([
        './node_modules/html5shiv/dist/html5shiv.min.js',
        './node_modules/respond.js/dest/respond.min.js'
        ])
    .pipe(gulp.dest(JSDest));
});


gulp.task('watch', function() {
  gulp.watch([
    'sass/**/*',
    'static/js/*'
  ], ['default']);
});


gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default',function(){
    gulp.start('styles', 'lint', 'scripts', 'scripts-concat', 'move-scripts', 'serve');
});






// var gulp = require('gulp'),
//     sass = require('gulp-sass'),
//     neat = require('node-neat').includePaths;

// var paths = {
//     scss: './sass/*.scss'
// };

// gulp.task('styles', function () {
//     return gulp.src(paths.scss)
//         .pipe(sass({
//             includePaths: ['styles'].concat(neat)
//         }))
//         .pipe(gulp.dest('./html/assets/css'));
// });

// gulp.task('default',function(){
//     gulp.start('styles');
// });

