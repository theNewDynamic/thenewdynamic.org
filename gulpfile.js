var 
    gulp            = require('gulp'),
    prefix          = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync'),
    concat          = require('gulp-concat'),
    copy            = require('gulp-copy'),
    cp              = require('child_process'),
    cssnano         = require('gulp-cssnano'),
    notify          = require('gulp-notify'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    util            = require('gulp-util'),
    watch           = require('gulp-watch'),
    nodeBourbon     = require('node-bourbon'),
    nodeNeat        = require('node-neat'),
    nodeSass        = require('node-sass');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var paths = 
{
    "filesSrcJs":[
        "node_modules/html5shiv/dist/html5shiv.min.js",
        "node_modules/respond.js/dest/respond.min.js"
    ],
    "filesSrcJsDest":"assets/js",

    "scssSrc":"_app/_scss",
    "cssDist":"assets/css",
    "BroswerSyncCssDist":"_site/assets/css",

    "scriptsSrc":[
        "node_modules/list.js/dist/list.min.js",
        "_app/js/*.js"
    ],
    "scriptsWatch":"_app/js",
    "scriptsDest":"assets/js",

    "imgSrcPath":"images/*.*",
    "imgDest":"assets/images",

    "browserList":"> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1",
}


//== Copy FIles

gulp.task('file-copy', function() {
    gulp.src(paths.filesSrcJs)
        .pipe(copy(paths.filesSrcJsDest, {prefix: 3}));
});




//== Scripts
gulp.task('js-uglify', function() {
    gulp.src(paths.scriptsSrc)
        .pipe(plumber({
             errorHandler: notify.onError("ERROR: JS Compilation Failed")
        }))
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(paths.scriptsDest))
}); 




/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);

    var jekyllEnv = process.env;
    jekyllEnv.JEKYLL_ENV = 'production';
    //jekyllEnv.JEKYLL_ENV = 'development';

    return cp.spawn(jekyll, ['build'], {stdio: 'inherit', env:jekyllEnv})
        .on('close', done);
});


/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});



/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});



/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src(paths.scssSrc + '/main.scss')
        .pipe(sass({
            includePaths: require('node-neat').includePaths,
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
         .pipe(cssnano({
      discardComments: {removeAll: false} //being non-commital on removing comments.
    }))
        .pipe(gulp.dest('assets/css'));
});



/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(paths.scssSrc + '/**/*.scss', ['sass']);
    
    gulp.watch(['**/*.md','**/*.md', '_app/_layouts/**/*.html','_app/_includes/**/*.html'], ['jekyll-rebuild']);
    
    gulp.watch(paths.scriptsWatch + '**/*.js', ['js-uglify', 'file-copy']);
});



/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
