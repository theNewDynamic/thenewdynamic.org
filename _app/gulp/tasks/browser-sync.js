module.exports = function(gulp, plugins, config) {
gulp.task('browser-sync', function() {

  bs1 = browserSync.create("first server")
​
# Paths
### You can also use a local url, in that case, use browserSync.init proxy: local ###
local = { baseDir: "./" }
​
### Define all your source files here ###
sync =
  css: 'stylesheets/**/*.css'
  html: '**/*.html'
​
# Tasks
### On each source file change, trigger a browsersync.reload ###
gulp.task 'browser-sync', ->
  bs1.init({
      port: 3014,
      server: "./"
  })
   });
};