
var curVersion = 'v55';

var request = require('request');

module.exports = function(grunt) {

  var firebaseUrl = 'webhook';
  var firebaseUri = null;
  if(firebaseUrl) {
    firebaseUri = 'https://' + firebaseUrl +  '.firebaseio.com/generator_version.json';
  }

  var checkVersion = function(callback) {
    if(firebaseUri === null) {
      callback();
    } else {
      request({ url: firebaseUri, json: true }, function(e, r, body) {
        if(body) {
          if(body !== curVersion) {
            console.log('========================================================'.red);
            console.log('# This site is using old Webhook code.     #'.red);
            console.log('========================================================'.red);
            console.log('#'.red + ' To update, run "wh update" in this folder.')
            console.log('# ---------------------------------------------------- #'.red)
          }

          callback();
        } else {
          callback();
        }
      });
    }
  };

  var npmBin = grunt.option('npmbin');
  var nodeBin = grunt.option('nodebin');
  var gruntBin = grunt.option('gruntbin');
  var token = grunt.option('token');
  var email = grunt.option('email');
  var npmCache = grunt.option('npmcache');

  var generator = require('../libs/generator').generator(grunt.config, { npm: npmBin, node: nodeBin, grunt: gruntBin, token: token, email: email, npmCache: npmCache }, grunt.log, grunt.file, root);

  grunt.registerTask('buildTemplates', 'Generate static files from templates directory', function() {
    var done = this.async();

    var production = grunt.option('production');

    if(production === true) {
      generator.enableProduction();
    }

    generator.renderTemplates(done, generator.reloadFiles);
  });

  grunt.registerTask('buildPages', 'Generate static files from pages directory', function() {
    var done = this.async();

    var production = grunt.option('production');

    if(production === true) {
      generator.enableProduction();
    }

    generator.renderPages(done, generator.reloadFiles);
  });

  grunt.registerTask('scaffolding', 'Generate scaffolding for a new object', function(name) {
    var done = this.async();

    var force = grunt.option('force');


    var result = generator.makeScaffolding(name, done, force);
  });

  grunt.registerTask('watch', 'Watch for changes in templates and regenerate site', function() {
    generator.startLiveReload();
    grunt.task.run('simple-watch');
  });

  grunt.registerTask('webListener', 'Listens for commands from CMS through websocket', function() {
    var done = this.async();
    generator.webListener(done);
  });

  grunt.registerTask('webListener-open', 'Listens for commands from CMS through websocket', function() {
    var done = this.async();
    generator.webListener(done);

    grunt.util.spawn({
      grunt: true,
      args: ['open:wh-open'].concat(grunt.option.flags()),
      opts: { stdio: 'inherit' }
    }, function (err, result, code) {
      if (err || code > 0) {
        grunt.log.warn('A problem occured while trying to open a browser window to connect to the site.')
        grunt.log.warn(result.stderr || result.stdout);
        grunt.log.warn('In order to access the site, please navigate to \'localhost:2002\' in your web browser.')
      }
      grunt.log.writeln('\n' + result.stdout);
    });
  });

  grunt.registerTask('clean', 'Clean build files', function() {
    var done = this.async();
    generator.cleanFiles(done);
  });

  grunt.registerTask('build-static', 'Just builds the static files, meant to be used with watch tasks.', function() {
    var done = this.async();

    var strict = grunt.option('strict');

    if(strict === true) {
      generator.enableStrictMode();
    }

    var production = grunt.option('production');

    if(production === true) {
      generator.enableProduction();
    }

    checkVersion(function() {
      generator.buildStatic(done);
    })
  });

  // Build Task.
  grunt.registerTask('build', 'Clean files and then generate static site into build', function() {
    var done = this.async();

    var strict = grunt.option('strict');

    if(strict === true) {
      generator.enableStrictMode();
    }

    var production = grunt.option('production');

    if(production === true) {
      generator.enableProduction();
    }

    checkVersion(function() {
      generator.buildBoth(done);
    })
  });

  // Change this to optionally prompt instead of requiring a sitename
  grunt.registerTask('assets', 'Initialize the firebase configuration file (installer should do this as well)', function() {
    var done = this.async();
    generator.assets(grunt, done);
  });

  grunt.registerTask('assetsMiddle', 'Initialize the firebase configuration file (installer should do this as well)', function() {
    generator.assetsMiddle(grunt);
  });

  grunt.registerTask('assetsAfter', 'Initialize the firebase configuration file (installer should do this as well)', function() {
    var done = this.async();
    generator.assetsAfter(grunt, done);
  });

  // Change this to optionally prompt instead of requiring a sitename
  grunt.registerTask('init', 'Initialize the firebase configuration file (installer should do this as well)', function() {
    var done = this.async();

    var sitename = grunt.option('sitename');
    var secretkey = grunt.option('secretkey');
    var server = grunt.option('server');
    var copyCms = grunt.option('copycms');
    var firebase = grunt.option('firebase');

    generator.init(sitename, secretkey, copyCms, firebase, server, done);
  });

  // Check if initialized properly before running all these tasks
  grunt.registerTask('default',  'Clean, Build, Start Local Server, and Watch', function() {
    grunt.task.run('configureProxies:wh-server')
    grunt.task.run('connect:wh-server');
    grunt.task.run('build');
    grunt.task.run('concurrent:wh-concurrent');
  });

};

module.exports.version = curVersion;
