'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dev: {
        options: {
          style: 'compressed',
          sourcemap: 'auto'
          // Uncomment the below line to include outside directories as well.
          // loadPath: ['location/of/other/sass']
        },
        files: [{
          // Files in the /sass/ directory will go to /static/css/ when processed.
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: 'static/css',
          ext: '.css'
        }]
      }
    },


  jquery: {
    dist: {
      options: {
        prefix: "jquery-custom-build-",
        minify: false
      },
      output: "static/javascript/dist",
      versions: {
        // Remove everything we don't need from 2.x versions static/javascript/dist/jquery-custom-build-2.0.3.js
        "2.0.3": [ 'ajax', 'css', 'deprecated', 'dimensions', 'effects', 'offset' ]      
      },
      
    }
  },


 concat: {
    dist: {
      src: ['bower_components/jquery/dist/jquery.min.js','bower_components/listjs/dist/list.js','static/javascript/site.js'],
      dest: 'static/javascript/dist/scripts.js',
    },
    listjs: {
      src: 'static/javascript/site-listjs.js',
      dest: 'static/javascript/dist/list-filters.min.js'
    },
    modernize: {
      src: ['bower_components/html5shiv/dist/html5shiv.min.js','bower_components/respond/dest/respond.min.js'],
      dest: 'static/javascript/modernize/modernize.min.js',
    }
  },

  uglify: {
    options: {
      mangle: {
        except: ['jQuery']
      }
    },
    my_target: {
      files: {
        'static/javascript/dist/scripts.min.js': ['static/javascript/dist/scripts.js'],
        'static/javascript/dist/list-filters.min.js': ['static/javascript/dist/list-filters.js']
      }
    }
  },




    // WHEN FILES CHANGE, RUN THE ABOVE TASKS ALONG WITH BUILD
    watch: {
      concat : {
        files:  'static/javascript/**/*.js',
        tasks: [ 'jquery','concat', 'uglify', 'build'],
         nonull: true,
      },
      sass : {
        files: 'sass/**/*.scss',
        tasks: ['sass', 'build'],
         nonull: true,
      }
    }

  });

  // THIS LOADS THE TASKS WE NEED ABOVE IN FROM OUR NPM
  // Note, that we need to have these installed through the package.json file as well

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jquery-builder');

  // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
  require('./options/generatorOptions.js')(grunt);
  grunt.loadTasks('tasks');
};
