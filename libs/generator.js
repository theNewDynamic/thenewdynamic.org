'use strict';

// Requires
var firebase = require('firebase');
var request = require('request');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var tinylr = require('tiny-lr');
var _ = require('lodash');
var wrench = require('wrench');
var utils = require('./utils.js');
var websocketServer = require('nodejs-websocket');
var Zip   = require('adm-zip');
var slug = require('uslug');
var async = require('async');
var spawn = require('win-spawn');
var md5 = require('MD5');
var $ = require('cheerio');
var exec = require('child_process').exec;

require('colors');

// Template requires
// TODO: Abstract these later to make it simpler to change
var swig = require('swig');
swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/..') });

var swigFunctions = require('./swig_functions').swigFunctions();
var swigFilters = require('./swig_filters');
var swigTags = require('./swig_tags');
swigFilters.init(swig);
swigTags.init(swig);
swig.setDefaults({ cache: false });

var wrap = function()
{
  var args = Array.prototype.slice.call(arguments);

  var last = args.pop();
  last = 'debugger;' +
         'var global = null;' +
         'var console = null;' +
         'var v8debug = null;' +
         'var setTimeout = null;' +
         'var setInterval = null;' +
         'var setImmediate = null;' +
         'var clearTimeout = null;' +
         'var clearInterval = null;' +
         'var clearImmediate = null;' +
         'var root = null;' +
         'var GLOBAL = null;' +
         'var window = null;' +
         'var process = null;' +
         'var eval = null;' +
         'var require = null;' +
         'var __filename = null;' +
         'var __dirname = null;' +
         'var modules = null;' +
         'var exports = null;' +
         last;

  args.push(last);

  return Function.prototype.constructor.apply(this, args);
};
wrap.prototype = Function.prototype;
Function = wrap;

// Disable console log in various things
//console.log = function () {};

var cmsSocketPort = 6557;

/**
 * Generator that handles various commands
 * @param  {Object}   config     Configuration options from .firebase.conf
 * @param  {Object}   logger     Object to use for logging, defaults to no-ops
 */
module.exports.generator = function (config, options, logger, fileParser) {
  var self = this;
  var firebaseUrl = config.get('webhook').firebase || 'webhook';
  var liveReloadPort = config.get('connect')['wh-server'].options.livereload;

  if(liveReloadPort !== 35730) {
    cmsSocketPort = liveReloadPort + 1; 
  }

  var websocket = null;
  var strictMode = false;
  var productionFlag = false;

  this.versionString = null;
  this.cachedData = null;

  if(liveReloadPort === true)
  {
    liveReloadPort = 35729;
  }

  logger = logger || { ok: function() {}, error: function() {}, write: function() {}, writeln: function() {} };

  // We dont error out here so init can still be run
  if (firebaseUrl)
  {
    this.root = new firebase('https://' + firebaseUrl +  '.firebaseio.com/');
  } else {
    this.root = null;
  }

  /**
   * Used to get the bucket were using (combinaton of config and environment)
   */
  var getBucket = function() {
    return self.root.child('buckets/' + config.get('webhook').siteName + '/' + config.get('webhook').secretKey + '/dev');
  };

  /**
   * Used to get the dns information about a site (used for certain swig functions)
   */
  var getDnsChild = function() {
    return self.root.child('management/sites/' + config.get('webhook').siteName + '/dns');
  };


  var getTypeData = function(type, callback) {
    getBucket().child('contentType').child(type).once('value', function(data) {
      callback(data.val());
    });
  }

  /**
   * Retrieves snapshot of data from Firebase
   * @param  {Function}   callback   Callback function to run after data is retrieved, is sent the snapshot
   */
  var getData = function(callback) {

    if(self.cachedData)
    {
      swigFunctions.setData(self.cachedData.data);
      swigFunctions.setTypeInfo(self.cachedData.typeInfo);
      swigFunctions.setSettings(self.cachedData.settings);
      swigFilters.setSiteDns(self.cachedData.siteDns);
      swigFilters.setFirebaseConf(config.get('webhook'));
      swigFilters.setTypeInfo(self.cachedData.typeInfo);

      callback(self.cachedData.data, self.cachedData.typeInfo);
      return;
    }

    if(!self.root)
    {
      throw new Error('Missing firebase reference, may need to run init');
    }

    getBucket().once('value', function(data) {
      data = data.val();
      var typeInfo = {};
      var settings = {};

      if(!data || !data['contentType'])
      {
        typeInfo = {};
      } else {
        typeInfo = data['contentType'];
      }

      if(!data || !data.settings) {
        settings = {};
      } else {
        settings = data.settings;
      }

      // Get the data portion of bucket, other things are not needed for templates
      if(!data || !data.data) {
        data = {};
      } else {
        data = data.data;
      }

      self.cachedData = {
        data: data,
        typeInfo: typeInfo,
        settings: settings
      };

      // Sets the context for swig functions
      swigFunctions.setData(data);
      swigFunctions.setTypeInfo(typeInfo);
      swigFunctions.setSettings(settings);
      swigFilters.setTypeInfo(typeInfo);

      getDnsChild().once('value', function(snap) {
        var siteDns = snap.val() || config.get('webhook').siteName + '.webhook.org';
        self.cachedData.siteDns = siteDns;
        swigFilters.setSiteDns(siteDns);
        swigFilters.setFirebaseConf(config.get('webhook'));

        callback(data, typeInfo);
      });
    }, function(error) {
      if(error.code === 'PERMISSION_DENIED') {
        console.log('\n========================================================'.red);
        console.log('# Permission denied                                         #'.red);
        console.log('========================================================'.red);
        console.log('#'.red + ' You don\'t have permission to this site or your subscription expired.'.red);
        console.log('# Visit '.red + 'https://billing.webhook.com/site/'.yellow + config.get('webhook').siteName.yellow + '/'.yellow  + ' to manage your subscription.'.red);
        console.log('# ---------------------------------------------------- #'.red)
        process.exit(0);
      } else {
        throw new Error(error);
      }
    });
  };

  var searchEntryStream = null;

  this.openSearchEntryStream = function(callback) {
    if(config.get('webhook').noSearch === true) {
      callback();
      return;
    }

    if(!fs.existsSync('./.build/.wh/')) {
      mkdirp.sync('./.build/.wh/');
    }

    searchEntryStream = fs.createWriteStream('./.build/.wh/searchjson.js');

    searchEntryStream.write('var tipuesearch = {"pages": [\n');

    callback();
  };


  this.closeSearchEntryStream = function(callback) {
    if(config.get('webhook').noSearch === true || !searchEntryStream) {
      callback();
      return;
    }

    searchEntryStream.end(']}');

    searchEntryStream.on('close', function() {
      callback();
    });
  };

  var writeSearchEntry = function(outFile, output) {
    if(config.get('webhook').noSearch === true || !searchEntryStream) {
      return;
    }

    var endUrl = outFile.replace('./.build', '');

    if(path.extname(endUrl) !== '.html' || endUrl === '/404.html' || endUrl.indexOf('/_wh_previews') === 0) {
      return;
    }

    endUrl = endUrl.replace('index.html', '');

    var content = $.load(output);

    var title = content('title').text();
    var bodyObj = content('body');

    if(bodyObj.attr('data-search-index') === "false") {
      return;
    }

    var specialChild = bodyObj.find('[data-search-index="true"]');

    if(specialChild.length > 0) {
      bodyObj = specialChild.first();
    }

    bodyObj.find('script').remove();
    bodyObj.find('iframe').remove();
    bodyObj.find('object').remove();
    bodyObj.find('[data-search-index="false"]').remove();

    var body = bodyObj.text().trim();
    var tags = "";

    if(content('meta[name="keywords"]').length > 0) {
      tags = content('meta[name="keywords"]').attr('content');
    }

    if(searchEntryStream) {
      var searchObj = {
        title: title,
        text: body,
        tags: tags,
        loc: endUrl
      };

      searchEntryStream.write(JSON.stringify(searchObj) + ',\n');

      searchObj = null;
    }

    title = '';
    body = '';
  };

  /**
   * Writes an instance of a template to the build directory
   * @param  {string}   inFile     Template to read
   * @param  {string}   outFile    Destination in build directory
   * @param  {Object}   params     The parameters to pass to the template
   */
  var writeTemplate = function(inFile, outFile, params) {
    params = params || {};
    params['firebase_conf'] = config.get('webhook');
    var originalOutFile = outFile;

    // Merge functions in
    params = utils.extend(params, swigFunctions.getFunctions());

    params.cmsSocketPort = cmsSocketPort;

    swigFunctions.init();

    var outputUrl = outFile.replace('index.html', '').replace('./.build', '');
    swigFunctions.setParams({ CURRENT_URL: outputUrl });

    if(params.item) {
      params.item = params._realGetItem(params.item._type, params.item._id, true);
    }

    params.production = productionFlag;

    var output = '';
    try {
      output = swig.renderFile(inFile, params);
    } catch (e) {
      self.sendSockMessage(e.toString());

      if(strictMode) {
        throw e;
      } else {
        console.log('Error while rendering template: ' + inFile);
        console.log(e.toString().red);
        try {
          output = swig.renderFile('./libs/debug500.html', { template: inFile, error: e.toString(), backtrace: e.stack.toString() })
        } catch (e) {
          return '';
        }
      }
    }

    mkdirp.sync(path.dirname(outFile));
    fs.writeFileSync(outFile, output);
    writeSearchEntry(outFile, output);

    // Haha this crazy nonsense is to handle pagination, the swig function "paginate" makes
    // shouldPaginate return true if there are more pages left, so we enter a while loop to
    // generate each page of the pagination (todo one day, abstract this with above code into simple functions)
    swigFunctions.increasePage();
    while(swigFunctions.shouldPaginate())
    {
      outFile = originalOutFile.replace('/index.html', '/' + swigFunctions.pageUrl + swigFunctions.curPage + '/index.html');
      outputUrl = outFile.replace('index.html', '').replace('./.build', '');

      swigFunctions.setParams({ CURRENT_URL: outputUrl });

      try {
        var output = swig.renderFile(inFile, params);
      } catch (e) {
        self.sendSockMessage(e.toString());

        if(strictMode) {
          throw e;
        } else {
          console.log('Error while rendering template: ' + inFile);
          console.log(e.toString().red);
          try {
            output = swig.renderFile('./libs/debug500.html', { template: inFile, error: e.toString(), backtrace: e.stack.toString() })
          } catch (e) {
            return '';
          }
        }
      }

      mkdirp.sync(path.dirname(outFile));
      fs.writeFileSync(outFile, output);
      writeSearchEntry(outFile, output);

      swigFunctions.increasePage();
    }

    return outFile.replace('./.build', '');
  };

  /**
   * Downloads a zip file from the requested url and extracts it into the main directory
   * @param  {string}   zipUrl     Url to zip file to download
   * @param  {Function}   callback   Callback, first parameter is error (true if error occured);
   */
  var downloadRepo = function(zipUrl, callback) {
    logger.ok('Downloading preset...');

    // Keep track if the request fails to prevent the continuation of the install
    var requestFailed = false;

    // TODO: have this hit different templating repos
    var repoRequest = request(zipUrl);

    repoRequest
    .on('response', function (response) {
      // If we fail, set it as failing and remove zip file
      if (response.statusCode !== 200) {
        requestFailed = true;
        fs.unlinkSync('.preset.zip');
        callback(true);
      }
    })
    .pipe(fs.createWriteStream('.preset.zip'))
    .on('close', function () {
      if (requestFailed) return;

      // Unzip into temporary file
      var zip = new Zip('.preset.zip');

      var entries = zip.getEntries();

      if(fs.existsSync('package.json')) {
        fs.renameSync('package.json', 'old.package.json');
      }

      entries.forEach(function(entry) {
        var newName = entry.entryName.split('/').slice(1).join('/');
        entry.entryName = newName;
      });
      zip.extractAllTo('.', true);

      if(fs.existsSync('old.package.json') && fs.existsSync('package.json')) {
        var packageJson = JSON.parse(fs.readFileSync('package.json'));
        var oldPackageJson = JSON.parse(fs.readFileSync('old.package.json'));

        var depends = packageJson.dependencies;
        var oldDepends = oldPackageJson.dependencies;

        _.assign(depends, oldDepends);

        packageJson.dependencies = depends;

        fs.writeFileSync('package.json', JSON.stringify(packageJson, null, "  "));
        fs.unlinkSync('old.package.json');
      } else if(fs.existsSync('old.package.json')) {
        fs.renameSync('old.package.json', 'package.json');
      }

      fs.unlinkSync('.preset.zip');
      callback();
    });
  };


  var resetGenerator = function(callback) {
    logger.ok('Resetting Generator...');
    var zipUrl = 'http://dump.webhook.com/static/generate-repo.zip';

    // Keep track if the request fails to prevent the continuation of the install
    var requestFailed = false;

    // TODO: have this hit different templating repos
    var repoRequest = request(zipUrl);

    repoRequest
    .on('response', function (response) {
      // If we fail, set it as failing and remove zip file
      if (response.statusCode !== 200) {
        requestFailed = true;
        fs.unlinkSync('.reset.zip');
        callback(true);
      }
    })
    .pipe(fs.createWriteStream('.reset.zip'))
    .on('close', function () {
      if (requestFailed) return;

      // Unzip into temporary file
      var zip = new Zip('.reset.zip');

      var entries = zip.getEntries();

      removeDirectory('.pages-old', function() {
        removeDirectory('.templates-old', function() {
          removeDirectory('.static-old', function() {

            try {
              fs.renameSync('pages', '.pages-old');
            } catch(error) {
              fs.unlinkSync('.reset.zip');
              callback(true);
              return;
            }

            try {
              fs.renameSync('templates', '.templates-old');
            } catch(error) {
              fs.renameSync('.pages-old', 'pages');
              fs.unlinkSync('.reset.zip');
              callback(true);
              return;
            }

            try {
              fs.renameSync('static', '.static-old');
            } catch(error) {
              fs.renameSync('.pages-old', 'pages');
              fs.renameSync('.templates-old', 'templates');
              fs.unlinkSync('.reset.zip');
              callback(true);
              return;
            }

            entries.forEach(function(entry) {
              if(entry.entryName.indexOf('pages/') === 0
                 || entry.entryName.indexOf('templates/') === 0
                 || entry.entryName.indexOf('static/') === 0) {
                zip.extractEntryTo(entry.entryName, '.', true, true);
              }
            });

            removeDirectory('.pages-old', function() {
              removeDirectory('.templates-old', function() {
                removeDirectory('.static-old', function() {
                  fs.unlinkSync('.reset.zip');

                  self.init(config.get('webhook').siteName, config.get('webhook').secretKey, true, config.get('webhook').firebase, config.get('webhook').server, function() {
                    callback();
                  });
                });
              });
            });

          });
        });
      });
    });
  };

  /**
  * Extracts a local theme zip into the current generator directory
  * @param zipUrl   The location of the zip file on disk
  * @param callback The callback to call with the data from the theme
  */
  var extractPresetLocal = function(fileData, callback) {

    fs.writeFileSync('.preset.zip', fileData, { encoding: 'base64' });
    // Unzip into temporary file
    var zip = new Zip('.preset.zip');

    var entries = zip.getEntries();

    if(fs.existsSync('package.json')) {
      fs.renameSync('package.json', 'old.package.json');
    }

    entries.forEach(function(entry) {
      var newName = entry.entryName.split('/').slice(1).join('/');
      entry.entryName = newName;
    });
    zip.extractAllTo('.', true);

    if(fs.existsSync('old.package.json') && fs.existsSync('package.json')) {
      var packageJson = JSON.parse(fs.readFileSync('package.json'));
      var oldPackageJson = JSON.parse(fs.readFileSync('old.package.json'));

      var depends = packageJson.dependencies;
      var oldDepends = oldPackageJson.dependencies;

      _.assign(depends, oldDepends);

      packageJson.dependencies = depends;

      fs.writeFileSync('package.json', JSON.stringify(packageJson, null, "  "));
      fs.unlinkSync('old.package.json');
    } else if(fs.existsSync('old.package.json')) {
      fs.renameSync('old.package.json', 'package.json');
    }

    fs.unlinkSync('.preset.zip');

    if(fs.existsSync('.preset-data.json')) {
      var presetData = fileParser.readJSON('.preset-data.json');

      fs.unlinkSync('.preset-data.json');
      logger.ok('Done extracting.');
      callback(presetData);

    } else {
      logger.ok('Done extracting.');
      callback(null);
    }
  }

  /**
   * Downloads zip file and then sends the preset data for the theme to the CMS for installation
   * @param  {string}   zipUrl     Url to zip file to download
   * @param  {Function}   callback   Callback, first parameter is preset data to send to CMS
   */
  var downloadPreset = function(zipUrl, callback) {
    downloadRepo(zipUrl, function() {
      if(fs.existsSync('.preset-data.json')) {
        var presetData = fileParser.readJSON('.preset-data.json');

        fs.unlinkSync('.preset-data.json');
        logger.ok('Done downloading.');
        callback(presetData);

      } else {
        logger.ok('Done downloading.');
        callback(null);
      }
    });
  };

  /**
   * Renders all templates in the /pages directory to the build directory
   * @param  {Function}   done     Callback passed either a true value to indicate its done, or an error
   * @param  {Function}   cb       Callback called after finished, passed list of files changed and done function
   */
  this.renderPages = function (done, cb)  {
    logger.ok('Rendering Pages\n');

    getData(function(data) {

      glob('pages/**/*', function(err, files) {
        files.forEach(function(file) {

          if(fs.lstatSync(file).isDirectory()) {
            return true;
          }

          var newFile = file.replace('pages', './.build');

          var dir = path.dirname(newFile);
          var filename = path.basename(newFile, path.extname(file));
          var extension = path.extname(file);

          if(path.extname(file) === '.html' && filename !== 'index' && path.basename(newFile) !== '404.html' && file.indexOf('.raw.html') === -1) {
            dir = dir + '/' + filename;
            filename = 'index';
          }

          if(filename.indexOf('.raw') !== -1 && filename.indexOf('.raw') === (filename.length - 4) && extension === '.html') {
            filename = filename.slice(0, filename.length - 4);
          }

          newFile = dir + '/' + filename + path.extname(file);

          if(extension === '.html' || extension === '.xml' || extension === '.rss' || extension === '.xhtml' || extension === '.atom' || extension === '.txt') { 
            writeTemplate(file, newFile);
          } else {
            mkdirp.sync(path.dirname(newFile));
            fs.writeFileSync(newFile, fs.readFileSync(file));
          }
        });

        if(fs.existsSync('./libs/.supported.js')) {
          mkdirp.sync('./.build/.wh/_supported');
          fs.writeFileSync('./.build/.wh/_supported/index.html', fs.readFileSync('./libs/.supported.js'));
        }

        logger.ok('Finished Rendering Pages\n');

        if(cb) cb(done);
      });

    });
  };

  var generatedSlugs = {};
  var generateSlug = function(value) {
    if(!generatedSlugs[value._type]) {
      generatedSlugs[value._type] = {};
    }

    if(value.slug) {
      generatedSlugs[value._type][value.slug] = true;
      return value.slug;
    }
    var tmpSlug = slug(value.name).toLowerCase();

    var no = 2;
    while(generatedSlugs[value._type][tmpSlug]) {
      tmpSlug = slug(value.name).toLowerCase() + '_' + no;
      no++;
    }

    generatedSlugs[value._type][tmpSlug] = true;

    return tmpSlug;
  }

  /**
   * Renders all templates in the /templates directory to the build directory
   * @param  {Function}   done     Callback passed either a true value to indicate its done, or an error
   * @param  {Function}   cb       Callback called after finished, passed list of files changed and done function
   */
  this.renderTemplates = function(done, cb) {
    logger.ok('Rendering Templates');
    generatedSlugs = {};

    getData(function(data, typeInfo) {

      glob('templates/**/*.html', function(err, files) {

        files.forEach(function(file) {
          // We ignore partials, special directory to allow making of partial includes
          if(path.extname(file) === '.html' && file.indexOf('templates/partials') !== 0)
          {
            if(path.dirname(file).split('/').length <= 1) {
              return true;
            }
            // Here we try and abstract out the content type name from directory structure
            var baseName = path.basename(file, '.html');
            var newPath = path.dirname(file).replace('templates', './.build').split('/').slice(0,3).join('/');

            var pathParts = path.dirname(file).split('/');
            var objectName = pathParts[1];
            var items = data[objectName];
            var info = typeInfo[objectName];
            var filePath = path.dirname(file);
            var overrideFile = null;

            if(!items) {
              logger.error('Missing data for content type ' + objectName);
            }

            items = _.map(items, function(value, key) { value._id = key; value._type = objectName; return value });

            var publishedItems = _.filter(items, function(item) {
              if(!item.publish_date) {
                return false;
              }

              var now = Date.now();
              var pdate = Date.parse(item.publish_date);

              if(pdate > now + (1 * 60 * 1000)) {
                return false;
              }

              return true;
            });

            var baseNewPath = '';

            // Find if this thing has a template control
            var templateWidgetName = null;

            if(typeInfo[objectName]) {
              typeInfo[objectName].controls.forEach(function(control) {
                if(control.controlType === 'layout') {
                  templateWidgetName = control.name;
                }
              });
            }

            var listPath = null;

            if(typeInfo[objectName] && typeInfo[objectName].customUrls && typeInfo[objectName].customUrls.listUrl) {
              var customPathParts = newPath.split('/');

              if(typeInfo[objectName].customUrls.listUrl === '#') // Special remove syntax
              {
                listPath = customPathParts.join('/');
                customPathParts.splice(2, 1);
              } else {
                customPathParts[2] = typeInfo[objectName].customUrls.listUrl;
              }

              newPath = customPathParts.join('/');
            }

            var origNewPath = newPath;

            // TODO, DETECT IF FILE ALREADY EXISTS, IF IT DOES APPEND A NUMBER TO IT DUMMY
            if(baseName === 'list')
            {
              newPath = newPath + '/index.html';

              if(listPath) {
                newPath = listPath + '/index.html';
              }

              writeTemplate(file, newPath);

            } else if (baseName === 'individual') {
              // Output should be path + id + '/index.html'
              // Should pass in object as 'item'
              baseNewPath = newPath;
              var previewPath = baseNewPath.replace('./.build', './.build/_wh_previews');

              // TODO: Check to make sure file does not exist yet, and then adjust slug if it does? (how to handle in swig functions)
              for(var key in publishedItems)
              {
                var val = publishedItems[key];

                if(templateWidgetName && val[templateWidgetName]) {
                  overrideFile = 'templates/' + objectName + '/layouts/' + val[templateWidgetName];
                }

                var addSlug = true;
                if(val.slug) {
                  baseNewPath = './.build/' + val.slug + '/';
                  addSlug = false;
                } else {
                  if(typeInfo[objectName] && typeInfo[objectName].customUrls && typeInfo[objectName].customUrls.individualUrl) {
                    baseNewPath = origNewPath + '/' + utils.parseCustomUrl(typeInfo[objectName].customUrls.individualUrl, val) + '/';
                  } else {
                    baseNewPath = origNewPath + '/';
                  }                
                }

                var tmpSlug = '';
                if(!val.slug) {
                  tmpSlug = generateSlug(val);
                } else {
                  tmpSlug = val.slug;
                }

                if(addSlug) {
                  val.slug = baseNewPath.replace('./.build/', '') + tmpSlug;
                  newPath = baseNewPath + tmpSlug + '/index.html';
                } else {
                  newPath = baseNewPath + 'index.html';
                }

                if(fs.existsSync(overrideFile)) {
                  writeTemplate(overrideFile, newPath, { item: val });
                  overrideFile = null;
                } else {
                  writeTemplate(file, newPath, { item: val });
                }
              }

              for(var key in items)
              {
                var val = items[key];

                if(templateWidgetName && val[templateWidgetName]) {
                  overrideFile = 'templates/' + objectName + '/layouts/' + val[templateWidgetName];
                }

                newPath = previewPath + '/' + val.preview_url + '/index.html';

                if(fs.existsSync(overrideFile)) {
                  writeTemplate(overrideFile, newPath, { item: val });
                  overrideFile = null;
                } else {
                  writeTemplate(file, newPath, { item: val });
                }
              }
            } else if(filePath.indexOf('templates/' + objectName + '/layouts') !== 0) { // Handle sub pages in here
              baseNewPath = newPath;

              var middlePathName = filePath.replace('templates/' + objectName, '') + '/' + baseName;
              middlePathName = middlePathName.substring(1);

              for(var key in publishedItems)
              {
                var val = publishedItems[key];

                var addSlug = true;
                if(val.slug) {
                  baseNewPath = './.build/' + val.slug + '/';
                  addSlug = false;
                } else {
                  if(typeInfo[objectName] && typeInfo[objectName].customUrls && typeInfo[objectName].customUrls.individualUrl) {
                    baseNewPath = origNewPath + '/' + utils.parseCustomUrl(typeInfo[objectName].customUrls.individualUrl, val) + '/';
                  }   else {
                    baseNewPath = origNewPath + '/';
                  }                  
                }

                var tmpSlug = '';
                if(!val.slug) {
                  tmpSlug = generateSlug(val);
                } else {
                  tmpSlug = val.slug;
                }

                if(addSlug) {
                  val.slug = baseNewPath.replace('./.build/', '') + tmpSlug;
                  newPath = baseNewPath + tmpSlug + '/' + middlePathName + '/index.html';
                } else {
                  newPath = baseNewPath + middlePathName + '/index.html';
                }

                writeTemplate(file, newPath, { item: val });
              }
            }
          }
        });

        logger.ok('Finished Rendering Templates');

        if(cb) cb(done);

      });
    });
  };

  /**
   * Copies the static directory into .build/static for asset generation
   * @param  {Function}   callback     Callback called after creation of directory is done
   */
  this.copyStatic = function(callback) {
    logger.ok('Copying static');
    if(fs.existsSync('static')) {
      mkdirp.sync('.build/static');
      wrench.copyDirSyncRecursive('static', '.build/static', { forceDelete: true });
    }
    callback();
  };

  var removeDirectory = function(directory, callback) {
    var isWin = /^win/.test(process.platform);

    if(isWin) {
      exec('rmdir /s /q ' + directory, function(err) {

        if(err) {
          if(fs.existsSync(directory)) {
            wrench.rmdirSyncRecursive(directory);
          }
        }
        callback();
      });
    } else {
      if(fs.existsSync(directory)) {
        wrench.rmdirSyncRecursive(directory);
      }

      callback();
    }
  }

  self.staticHashs = false;
  self.changedStaticFiles = [];

  /**
  * This creates a hash table of all the static files, used to send detailed information to livereload
  * We only do this for static files for speed, for regular files a full reload usually is ok.
  */
  var createStaticHashs = function() {
    self.staticHashs = {};
    self.changedStaticFiles = [];

    if(fs.existsSync('.build/static')) {
      var files = wrench.readdirSyncRecursive('.build/static');

      files.forEach(function(file) {
        var file = '.build/static/' + file;

        if(!fs.lstatSync(file).isDirectory()) {
          var hash = md5(fs.readFileSync(file));

          self.staticHashs[file] = hash;
        }
      })
    } else {
      self.staticHashs = false;
      self.changedStaticFiles = [];
    }
  };

  /**
   * Cleans the build directory
   * @param  {Function}   done     Callback passed either a true value to indicate its done, or an error
   * @param  {Function}   cb       Callback called after finished, passed list of files changed and done function
   */
  this.cleanFiles = function(done, cb) {
      logger.ok('Cleaning files');

      removeDirectory('.build', function() {
        if (cb) cb();
        if (done) done(true);
      });
  };

  var buildQueue = async.queue(function (task, callback) {
    if(task.type === 'static') {

      // For static builds we create a hash table to send correct livereload info
      // We only do this for static files for speed, normal builds dont really matter
      createStaticHashs();

      removeDirectory('.build/static', function() {
        self.copyStatic(function() {
          self.reloadFiles(callback);
        });
      });
    } else {
      self.realBuildBoth(function() {
        callback();
      }, self.reloadFiles);
    }
  }, 1);

  this.buildBoth = function(done) {
    buildQueue.push({ type: 'all' }, function(err) {
      done();
    });
  };

  this.buildStatic = function(done) {
    buildQueue.push({ type: 'static' }, function(err) {
      done();
    });
  };

  /**
   * Builds templates from both /pages and /templates to the build directory
   * @param  {Function}   done     Callback passed either a true value to indicate its done, or an error
   * @param  {Function}   cb       Callback called after finished, passed list of files changed and done function
   */
  this.realBuildBoth = function(done, cb) {
    // clean files
    self.cachedData = null;
    self.cleanFiles(null, function() {
      self.openSearchEntryStream(function() {
        self.renderTemplates(null, function() {
          self.copyStatic(function() {
            self.renderPages(function() {}, function() {
              self.closeSearchEntryStream(function() {
                cb(done);
              });
            });
          });
        });
      })
    });
  };

  this.checkScaffoldingMD5 = function(name, callback) {
    self.cachedData = null;
    getData(function(data, typeInfo) {
      var directory = 'templates/' + name + '/';
      var individual = directory + 'individual.html';
      var list = directory + 'list.html';
      var oneOff = 'pages/' + name + '.html';

      var individualMD5 = null;
      var listMD5 = null;
      var oneOffMD5 = null;

      if(typeInfo[name].oneOff) {
        if(fs.existsSync(oneOff)) {
          var oneOffContent = fs.readFileSync(oneOff);
          oneOffMD5 = md5(oneOffContent);
        }
      } else {
        if(fs.existsSync(individual)) {
          var indContent = fs.readFileSync(individual);
          individualMD5 = md5(indContent);
        }

        if(fs.existsSync(list)) {
          var listContent = fs.readFileSync(list);
          listMD5 = md5(listContent);
        }
      }

      callback(individualMD5, listMD5, oneOffMD5);
    });
  }

  /**
   * Generates scaffolding for content type with name
   * @param  {String}   name     Name of content type to generate scaffolding for
   * @param  {Function}   done     Callback called when scaffolding generation is done
   * @param  {Boolean}   force    If true, forcibly overwrites old scaffolding
   */
  this.makeScaffolding = function(name, done, force) {
    logger.ok('Creating Scaffolding for ' + name + '\n');
    var directory = 'templates/' + name + '/';

    var list = directory + 'list.html';
    var individual = directory +  'individual.html';
    var oneOff = 'pages/' + name + '.html';

    var individualTemplate = fs.readFileSync('./libs/scaffolding_individual.html');
    var listTemplate = fs.readFileSync('./libs/scaffolding_list.html');
    var oneOffTemplate = fs.readFileSync('./libs/scaffolding_oneoff.html');

    var widgetFilesRaw = [];

    if(fs.existsSync('./libs/widgets')) {
      widgetFilesRaw = wrench.readdirSyncRecursive('./libs/widgets');
    }

    var widgetFiles = [];

    widgetFilesRaw.forEach(function(item) {
      widgetFiles[(path.dirname(item) + '/' + path.basename(item, '.html')).replace('./', '')] = true;
    });

    var renderWidget = function(controlType, fieldName, controlInfo, overridePrefix) {
      var controls = [];

      if(controlInfo.controls) {
        _.each(controlInfo.controls, function(item) {
          controls[item.name] = item;
        });
      }

      var prefix = overridePrefix || 'item.';

      var widgetString = _.template(fs.readFileSync('./libs/widgets/' + controlType + '.html'), { value: prefix + fieldName, controlInfo: controlInfo, renderWidget: renderWidget, controls: controls, widgetFiles: widgetFiles });

      var lines = widgetString.split('\n');
      var newLines = [];
      var first = true;

      lines.forEach(function(line) {
        if(first) {
          first = false;
          newLines.push(line);
        } else {
          var newLine = '        ' + line;
          newLines.push(newLine);
        }
      });

      return newLines.join('\n');
    };

    self.cachedData = null;
    getData(function(data, typeInfo) {
      var controls = typeInfo[name] ? typeInfo[name].controls : [];
      var controlsObj = {};

      _.each(controls, function(item) {
        controlsObj[item.name] = item;
      });

      var individualMD5 = null;
      var listMD5 = null;
      var oneOffMD5 = null;

      if(typeInfo[name].oneOff) {
        if(!force && fs.existsSync(oneOff)) {
          if(done) done(null, null, null);
          logger.error('Scaffolding for ' + name + ' already exists, use --force to overwrite');
          return false;
        }

        var oneOffFile = _.template(oneOffTemplate, { widgetFiles: widgetFiles, typeName: name, typeInfo: typeInfo[name] || {}, controls: controlsObj }, { 'imports': { 'renderWidget' : renderWidget}});
        oneOffFile = oneOffFile.replace(/^\s*\n/gm, '');

        oneOffMD5 = md5(oneOffFile);
        fs.writeFileSync(oneOff, oneOffFile);
      } else {

        if(!force && fs.existsSync(directory)) {
          if(done) done(null, null, null);
          logger.error('Scaffolding for ' + name + ' already exists, use --force to overwrite');
          return false;
        }

        mkdirp.sync(directory);

        var template = _.template(individualTemplate, { widgetFiles: widgetFiles, typeName: name, typeInfo: typeInfo[name] || {}, controls: controlsObj }, { 'imports': { 'renderWidget' : renderWidget}});
        template = template.replace(/^\s*\n/gm, '');

        individualMD5 = md5(template);
        fs.writeFileSync(individual, template);

        var lTemplate = _.template(listTemplate, { typeName: name });

        listMD5 = md5(lTemplate);
        fs.writeFileSync(list, lTemplate);
      }

      if(done) done(individualMD5, listMD5, oneOffMD5);
    });

    return true;
  };

  /**
   * Send signal to local livereload server to reload files
   * @param  {Array}      files     List of files to reload
   * @param  {Function}   done      Callback passed either a true value to indicate its done, or an error
   */
  this.reloadFiles = function(done) {
    var fileList = 'true';

    if(self.staticHashs !== false && fs.existsSync('.build/static')) {
      var newFiles = wrench.readdirSyncRecursive('.build/static');

      newFiles.forEach(function(file) {
        var file = '.build/static/' + file;


        if(!fs.lstatSync(file).isDirectory()) {
          var hash = md5(fs.readFileSync(file));

          if(hash !== self.staticHashs[file]) {
            self.changedStaticFiles.push(file.replace('.build', ''));
          }

          if(file in self.staticHashs) {
            delete self.staticHashs[file];
          }
        }
      })

      // For any left over keys, means they got deleted
      for(var key in self.staticHashs) {
        self.changedStaticFiles.push(key.replace('.build', ''));
      }

      if(self.changedStaticFiles.length === 0) {
        if(done) done(true);
        self.staticHashs = false;
        self.changedStaticFiles = [];
        return;
      }

      fileList = self.changedStaticFiles.join(',');

      self.staticHashs = false;
      self.changedStaticFiles = [];
    }


    request({ url : 'http://localhost:' + liveReloadPort + '/changed?files=' + fileList, timeout: 10  }, function(error, response, body) {
      if(done) done(true);
    });
  };

  /**
   * Starts a live reload server, which will refresh the pages when signaled
   */
  this.startLiveReload = function() {
    tinylr({ liveCSS: true, liveImg: true }).listen(liveReloadPort);
  };

  /**
   * Sends a message to the CMS through a websocket initiated by the CMS
   * @param  {String}      message    Message to send
   */
  this.sendSockMessage = function(message) {
    if(websocket) {
      websocket.sendText('message:' + JSON.stringify(message));
    }
  };

  var runCommand = function(cmd, cwd, args, pipe, cb) {
    if(typeof pipe == 'function') {
      cb = pipe;
      pipe = false;
    }

    var command = spawn(cmd, args, {
      stdio: [process.stdin, pipe ? 'pipe' : process.stdout, process.stderr],
      cwd: cwd
    });

    var output = '';

    if(pipe) {
      command.stdout.on('data', function(data) {
        output += data;
      });
    }

    command.on('close', function() {
      cb(output);
    })
  }

  var runNpm = function(cb) {
    if(options.npmCache) {
      runCommand(options.npm || 'npm', '.', ['config', 'get', 'cache'], true, function(diroutput) {
        var oldCacheDir = diroutput.trim();
        runCommand(options.npm || 'npm', '.', ['config', 'set', 'cache', options.npmCache], function() {
          runCommand(options.npm || 'npm', '.', ['install'], function() {
            runCommand(options.npm || 'npm', '.', ['config', 'set', 'cache', oldCacheDir], function() {
              cb();
            });
          });
        });
      });
    } else {
      runCommand(options.npm || 'npm', '.', ['install'], function() {
        console.log('NPM done');
        cb();
      }); 
    }
  };

  /**
   * Starts a websocket listener on 0.0.0.0 (for people who want to run wh serv over a network)
   * Accepts messages for generating scaffolding and downloading preset themes.
   */
  this.webListener = function() {
    var server = new websocketServer.createServer(function(sock) {

      websocket = sock;

      sock.on('close', function() {
        websocket = null;
      });

      sock.on('error', function() {
      })

      sock.on('text', function(message) {
        if(message.indexOf('scaffolding:') === 0)
        {
          var name = message.replace('scaffolding:', '');
          self.makeScaffolding(name, function(individualMD5, listMD5, oneOffMD5) {
            sock.sendText('done:' + JSON.stringify({ individualMD5: individualMD5, listMD5: listMD5, oneOffMD5: oneOffMD5 }));
          });
        } else if (message.indexOf('scaffolding_force:') === 0) {
          var name = message.replace('scaffolding_force:', '');
          self.makeScaffolding(name, function(individualMD5, listMD5, oneOffMD5) {
            sock.sendText('done:' + JSON.stringify({ individualMD5: individualMD5, listMD5: listMD5, oneOffMD5: oneOffMD5 }));
          }, true);
        } else if (message.indexOf('check_scaffolding:') === 0) {
          var name = message.replace('check_scaffolding:', '');
          self.checkScaffoldingMD5(name, function(individualMD5, listMD5, oneOffMD5) {
            sock.sendText('done:' + JSON.stringify({ individualMD5: individualMD5, listMD5: listMD5, oneOffMD5: oneOffMD5 }));
          });
        } else if (message === 'reset_files') {
          resetGenerator(function(error) {
            if(error) {
              sock.sendText('done:' + JSON.stringify({ err: 'Error while resetting files' }));
            } else {
              sock.sendText('done');
            }
          });
        } else if (message === 'supported_messages') {
          sock.sendText('done:' + JSON.stringify([
            'scaffolding', 'scaffolding_force', 'check_scaffolding', 'reset_files', 'supported_messages',
            'push', 'build', 'preset', 'layouts', 'preset_localv2', 'generate_slug_v2'
          ]));
        } else if (message.indexOf('generate_slug_v2:') === 0) {
          var obj = JSON.parse(message.replace('generate_slug_v2:', ''));
          var type = obj.type;
          var name = obj.name;
          var date = obj.date;

          getTypeData(type, function(typeInfo) {
            var tmpSlug = '';
            tmpSlug = slug(name).toLowerCase();

            if(typeInfo && typeInfo.customUrls && typeInfo.customUrls.individualUrl) {
              tmpSlug = utils.parseCustomUrl(typeInfo.customUrls.individualUrl, date) + '/' + tmpSlug;
            } 

            if(typeInfo && typeInfo.customUrls && typeInfo.customUrls.listUrl) {

              if(typeInfo.customUrls.listUrl === '#') {
                tmpSlug = tmpSlug;
              } else {
                tmpSlug = typeInfo.customUrls.listUrl + '/' + tmpSlug;
              }
            } else {
              tmpSlug = type + '/' + tmpSlug;
            }
              
            sock.sendText('done:' + JSON.stringify(tmpSlug));
          });
        } else if (message === 'build') {
          buildQueue.push({ type: 'all' }, function(err) { 
            sock.sendText('done');
          });
        } else if (message.indexOf('preset_local:') === 0) {
          var fileData = message.replace('preset_local:', '');

          if(!fileData) {
            sock.sendText('done');
            return;
          }

          extractPresetLocal(fileData, function(data) {
            runNpm(function() {
              sock.sendText('done:' + JSON.stringify(data));
            });
          });
        } else if (message.indexOf('preset:') === 0) {
          var url = message.replace('preset:', '');
          if(!url) {
            sock.sendText('done');
            return;
          }
          downloadPreset(url, function(data) {
            runNpm(function() {
              sock.sendText('done:' + JSON.stringify(data));
            });
          });
        } else {
          sock.sendText('done');
        }
      });
    }).listen(cmsSocketPort, '0.0.0.0');
  };

  /**
   * Inintializes firebase configuration for a new site
   * @param  {String}    sitename  Name of site to generate config for
   * @param  {String}    secretkey Secret key for the site (gotten from firebase)
   * @param  {Boolean}   copyCms   True if the CMS should be overwritten, false otherwise
   * @param  {Function}  done      Callback to call when operation is done
   */
  this.init = function(sitename, secretkey, copyCms, firebase, server, done) {
    var oldConf = config.get('webhook');

    var confFile = fs.readFileSync('./libs/.firebase.conf.jst');

    if(firebase || server) {
      confFile = fs.readFileSync('./libs/.firebase-custom.conf.jst');
    }

    var noSearch = null;

    if(oldConf.noSearch !== null && typeof oldConf.noSearch !== 'undefined') {
      noSearch = oldConf.noSearch;
    }

    // TODO: Grab bucket information from server eventually, for now just use the site name
    var templated = _.template(confFile, { secretKey: secretkey, siteName: sitename, firebase: firebase, embedlyKey: oldConf.embedly || 'your-embedly-key', serverAddr: oldConf.server || server || 'your-server-address', noSearch: noSearch, imageproxy: oldConf.imageproxy || null });

    fs.writeFileSync('./.firebase.conf', templated);

    if(copyCms) {
      var cmsFile = fs.readFileSync('./libs/cms.html');

      var cmsTemplated = _.template(cmsFile, { siteName: sitename });

      mkdirp.sync('./pages/');

      fs.writeFileSync('./pages/cms.html', cmsTemplated);
    }

    done(true);
  };

  /**
   * Sets up asset generation (automatic versioning) for pushing to production
   * @param  {Object}    grunt  Grunt object from generatorTasks
   */
  this.assets = function(grunt, done) {

    removeDirectory('.whdist', function() {

      mkdirp.sync('.whdist');

      var files = wrench.readdirSyncRecursive('pages');

      files.forEach(function(file) {
        var originalFile = 'pages/' + file;
        var destFile = '.whdist/pages/' + file;

        if(!fs.lstatSync(originalFile).isDirectory())
        {
          var content = fs.readFileSync(originalFile);

          if(path.extname(originalFile) === '.html') {
            content = content.toString();
            content = content.replace('\r\n', '\n').replace('\r', '\n');
          }

          mkdirp.sync(path.dirname(destFile));
          fs.writeFileSync(destFile, content);
        }
      });

      files = wrench.readdirSyncRecursive('templates');

      files.forEach(function(file) {
        var originalFile = 'templates/' + file;
        var destFile = '.whdist/templates/' + file;

        if(!fs.lstatSync(originalFile).isDirectory())
        {
          var content = fs.readFileSync(originalFile);

          if(path.extname(originalFile) === '.html') {
            content = content.toString();
            content = content.replace('\r\n', '\n').replace('\r', '\n');
          }

          mkdirp.sync(path.dirname(destFile));
          fs.writeFileSync(destFile, content);
        }
      });

      files = wrench.readdirSyncRecursive('static');

      files.forEach(function(file) {
        var originalFile = 'static/' + file;
        var destFile = '.whdist/static/' + file;

        if(!fs.lstatSync(originalFile).isDirectory())
        {
          var content = fs.readFileSync(originalFile);

          if(path.extname(originalFile) === '.html') {
            content = content.toString();
            content = content.replace('\r\n', '\n').replace('\r', '\n');
          }

          mkdirp.sync(path.dirname(destFile));
          fs.writeFileSync(destFile, content);
        }
      });

      grunt.task.run('useminPrepare');
      grunt.task.run('assetsMiddle');

      done();
    });

  }

  /**
   * Run asset versioning software if configs exist for them
   * @param  {Object}    grunt  Grunt object from generatorTasks
   */
  this.assetsMiddle = function(grunt) {

    grunt.option('force', true);

    if(!_.isEmpty(grunt.config.get('concat')))
    {
      grunt.task.run('concat');
    }

    if(!_.isEmpty(grunt.config.get('uglify')))
    {
      grunt.task.run('uglify');
    }

    if(!_.isEmpty(grunt.config.get('cssmin')))
    {
      grunt.task.run('cssmin');
    }

    grunt.task.run('rev');
    grunt.task.run('usemin');
    grunt.task.run('assetsAfter');

  }

  /**
   * Finish asset versioning
   * @param  {Object}    grunt  Grunt object from generatorTasks
   */
  this.assetsAfter = function(grunt, done) {
    removeDirectory('.tmp', function() {
      var files = wrench.readdirSyncRecursive('static');

      files.forEach(function(file) {
        var filePath = 'static/' + file;
        var distPath = '.whdist/static/' + file;
        if(!fs.lstatSync(filePath).isDirectory() && !fs.existsSync(distPath)) {
          var fileData = fs.readFileSync(filePath);
          fs.writeFileSync(distPath, fileData);
        }
      });

      done();
    });
  }

  /**
   * Enables strict mode, exceptions cause full crash, normally for production (so bad generators do not ruin sites)
   */
  this.enableStrictMode = function() {
    strictMode = true;
  }

  this.enableProduction = function() {
    productionFlag = true;
    swig.setDefaults({ cache: 'memory' });
  }

  return this;
};
