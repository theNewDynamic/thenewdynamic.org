'use strict';

var _ = require('lodash');
var utils = require('./utils.js');
var marked = require('marked');
var dateFormatter = require('./dateformatter.js');

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function (str){
    return this.slice(-str.length) == str;
  };
}

/**
 * Defines a set of filters available in swig templates
 * @param  {Object}   swig        Swig engine to add filters to
 */
module.exports.init = function (swig) {

  var siteDns = '';
  var firebaseConf = {};
  var typeInfo = {};

  var upper = function(input) {
    return input.toUpperCase();
  };

  var slice = function(input, offset, limit) {
    if(typeof input === 'string') {
      return input.slice(offset, offset + limit);
    }
    if(Array.isArray(input))
    {
      return input.slice(offset || 0, offset + limit)
    }

    return utils.sliceDictionary(input, limit, offset);
  };

  var truncate = function(input, limit) {
    if (!input || !limit) { return input; }

    if (input.length > limit && input.length > 0) {
        var new_str = input + " ";
        new_str = input.substr (0, limit);
        new_str = input.substr (0, new_str.lastIndexOf(" "));
        new_str = (new_str.length > 0) ? new_str : input.substr (0, limit);
 
        return new_str + '...' ;
    }

    return input;
  }

  var sort = function(input, property, reverse) {

    if(_.size(input) === 0) {
      return input;
    }

    var first = input[0];
    var sortProperty = '_sort_' + property;

    if(first[sortProperty]) {
      property = sortProperty;
    }

    if(reverse) {
      return _.sortBy(input, property).reverse();
    }
    
    return _.sortBy(input, property)
  };

  var reverse = function(input, reverse) {
    return _(input).reverse();
  };

  var groupBy = function (input, key) {
    if (!_.isArray(input)) {
      return input;
    }

    var out = {};

    _.forEach(input, function (value) {
      if (!value.hasOwnProperty(key)) {
        return;
      }

      var keyname = value[key],
        newVal = utils.extend({}, value);

      if (!out[keyname]) {
        out[keyname] = [];
      }

      out[keyname].push(value);
    });

    return out;
  };

  var googleImageSize = function(image, width, height, crop) {

    var source = image.resize_url;

    if(width === 'auto' && height === 'auto') {
      return image.resize_url;
    } else if(width === 'auto' && height) {
      source += '=h' + height;
    } else if(width && height === 'auto') {
      source += '=w' + width;
    } else if(width && height) {
      source += '=w' + width + '-h' +height;
    } else if(width && !height) {
      source += '=s' + width;
    }

    if(crop) {
      source += '-c';
    }

    if(source.indexOf('http://') === 0) {
      source = source.replace('http://', 'https://');
    }

    return source;
  };

  var justinImageSize = function(image, width, height, crop) {

    var source = image.resize_url,
        parts = source.split('.'),
        ext = parts.length > 1 ? ('.' + parts.pop()) : '';

    source = parts.join('.');

    if(width === 'auto' && height === 'auto') {
      return source + '-0x0' + ext;
    } else if(width === 'auto' && height) {
      source += '-0x' + height;
    } else if(width && height === 'auto') {
      source += '-' + width + 'x0';
    } else if(width && height) {
      source += '-' + width + 'x' + height;
    } else if(width && !height) {
      source += '-' + width + 'x' + width;
    }

    if(crop) {
      source += '-c';
    } else {
      source += '-a';
    }

    source += ext;

    return source;
  };

  var imageSize = function(input, size, deprecatedHeight, deprecatedGrow) {

    if(!input) {
      return '';
    }

    var imageSource = '';

    if(typeof input === 'object') {

      if(!size) {
        return input.url;
      }

      if(!input.resize_url) {
        return input.url;
      }

      if (input.resize_url.indexOf('http://static-cdn.jtvnw.net') === 0) {
        return justinImageSize(input, size, deprecatedHeight);
      }

      return googleImageSize(input, size, deprecatedHeight);
    } else if (typeof input === 'string') {
      console.log('The imageSize filter only supports image objects and not raw urls.'.red);

      var params = [];
      if(size) {
        params.push('width=' + size);
      }

      if(deprecatedHeight) {
        params.push('height=' + deprecatedHeight);
      }

      if(deprecatedGrow) {
        params.push('grow=' + deprecatedGrow);
      }

      if(input.indexOf('http://') === -1) {
        input = 'http://' + siteDns + input;
      }

      params.push('url=' + encodeURIComponent(input));

      if(firebaseConf.embedly) {
        params.push('key=' + firebaseConf.embedly);
      } else {
        params.push('key=13dde81b8137446e89c7933edca679eb');
      }
      
      imageSource = 'http://i.embed.ly/1/display/resize?' + params.join('&');
    }

    return imageSource
  };

  var imageCrop = function(input, size, deprecatedHeight) {

    if(!input) {
      return '';
    }
    
    var imageSource = '';

    if(typeof input === 'object') {

      if(!size) {
        return input.url;
      }

      if (input.resize_url.indexOf('http://static-cdn.jtvnw.net') === 0) {
        return justinImageSize(input, size, deprecatedHeight, true);
      }

      return googleImageSize(input, size, deprecatedHeight, true);      
    } else if (typeof input === 'string') {
      console.log('The imageCrop filter only supports image objects and not raw urls.'.red);

      var params = [];
      if(size) {
        params.push('width=' + size);
      }

      if(deprecatedHeight) {
        params.push('height=' + deprecatedHeight);
      }

      if(input.indexOf('http://') === -1) {
        input = 'http://' + siteDns + input;
      }

      params.push('url=' + encodeURIComponent(input));

      if(firebaseConf.embedly) {
        params.push('key=' + firebaseConf.embedly);
      } else {
        params.push('key=13dde81b8137446e89c7933edca679eb');
      }
      imageSource = 'http://i.embed.ly/1/display/crop?' + params.join('&');
    }
    
    return imageSource;
  };

  var size = function(input) {
    return _(input).size();
  };

  var markdown = function(input) {
    return marked(input);
  }

  var startsWith = function(input, string) {
    if(typeof(input) !== "string") {
      return false;
    }

    return input.startsWith(string);
  };

  var endsWith = function(input, string) {
    if(typeof(input) !== "string") {
      return false;
    }
    
    return input.endsWith(string);
  };

  this.setTypeInfo = function(tInfo) {
    typeInfo = tInfo;
  }
  this.setSiteDns = function(dns) {
    siteDns = dns;
  }

  this.setFirebaseConf = function(conf) {
    firebaseConf = conf;
  }

  var date = function(input, format, offset, abbr) {
    var l = format.length,
      date = new dateFormatter.DateZ(input),
      cur,
      i = 0,
      out = '';

    if(!offset && typeof input === 'string') {
      var offsetString = input.match(/[\+-]\d{2}:\d{2}$/);

      var modifier = 1;
      if(offsetString) {
        offsetString = offsetString[0];
        if(offsetString[0] === '+') {
          modifier = -1;
        }

        offsetString = offsetString.slice(1);
        var parts = offsetString.split(':');

        var hours = parts[0] * 1;
        var minutes = parts[1] * 1;

        offset = modifier * ((hours * 60) + minutes);
      }
    }

    if (offset) {
      date.setTimezoneOffset(offset, abbr);
    }

    for (i; i < l; i += 1) {
      cur = format.charAt(i);
      if (dateFormatter.hasOwnProperty(cur)) {
        out += dateFormatter[cur](date, offset, abbr);
      } else {
        out += cur;
      }
    }

    return out;
  };

  var duration = function(input) {
    var timestring = '';
    var minutesString = '';
    var secondsString = '';
    var hourString = '';

    var seconds = Math.floor(input % 60);
    var minutesRaw = Math.floor(input / 60);
    var minutes = minutesRaw % 60;
    var hours = Math.floor(minutesRaw / 60);

    if(minutes === 0) {
      minutesString = '00';
    } else if (minutes < 10) {
      minutesString = '0' + minutes;
    } else {
      minutesString = '' + minutes;
    }

    if(seconds === 0) {
      secondsString = '00';
    } else if (seconds < 10) {
      secondsString = '0' + seconds;
    } else {
      secondsString = '' + seconds;
    }

    if (hours === 0) {
      hourString = '';
    }  else if (hours < 10) {
      hourString = '0' + hours;
    } else {
      hourString = '' + hours;
    }

    timestring = minutesString + ':' + secondsString;

    if(hours > 0) {
      timestring = hourString + ':' + timestring;
    }

    return timestring;
  };

  var where = function(input, property) {
    var filtered = [];

    var args =  [].slice.apply(arguments);
    var filters = args.slice(2);

    input.forEach(function(item) {
      if(filters.length === 0) {
        if(item[property]) // Exists
          filtered.push(item);
      } else {
        filters.forEach(function(filter) {
          if(item[property] === filter) {
            filtered.push(item);
            return false;
          }
        })
      }
    });
    return filtered;
  }

  var relationshipHas = function(input, relationshipName, property) {
    var filtered = [];
    var args =  [].slice.apply(arguments);
    var filters = args.slice(3);

    input.forEach(function(item) {
      var relationship = item[relationshipName];

      if (relationship) {
        if(Array.isArray(relationship)) {
          var include = false;

          relationship.forEach(function(subItem) {
            if(filters.length === 0 && subItem && subItem[property]) {
              include = true;
            }

            if(filters.length > 0) {
              filters.forEach(function(filter) {
                if(subItem && subItem[property] === filter) {
                  include = true;
                }
              })
            }
          });

          if(include) {
            filtered.push(item);
          }
        } else {
          if(filters.length === 0 && relationship && relationship[property]) {
            filtered.push(item);
          }

          if(filters.length > 0) {
            filters.forEach(function(filter) {
              if(subItem && subItem[property] === filter) {
                filtered.push(item);
              }
            })
          }
        }
      }
    })

    return filtered;
  }

  var exclude = function(input, property) {
    var filtered = [];

    var args =  [].slice.apply(arguments);
    var filters = args.slice(2);

    input.forEach(function(item) {
      var addIn = true;

      if(filters.length === 0) {
        if(!item[property]) // Exists
          filtered.push(item);
      } else {
        filters.forEach(function(filter) {
          if(Array.isArray(filter)) {
            filter.forEach(function(checkItem) {
              if(item[property] === checkItem[property]) {
                addIn = false;
                return false;
              }
            })
          } else {
            if(item[property] === filter) {
              addIn = false;
              return false;
            }
          }
        })

        if(addIn) {
          filtered.push(item);
        }
      }
    });
    return filtered;
  }
  var abs = function(input) {
    return Math.abs(input);
  };

  var linebreaks = function(input) {
    var parts = input.replace('\r\n', '\n').replace('\r', '\n').split('\n');
 
    var joined = parts.join('<br/>');

    return '<p>' + joined + '</p>'
  };

  var jsonFixer = function(key, value) {
    if(!key) {
      return value;
    }

    if(!value) {
      return value;
    }

    if(!this._type) {
      return value;
    }

    var info = typeInfo[this._type] || {};
    var controls = info.controls || {};
    var controlCandidates = _.where(controls, { name: key });

    if(controlCandidates.length === 0) {
      return value;
    }

    var control = controlCandidates[0];

    if(control.controlType === 'relation') {
      var str = '';
      if(Array.isArray(value)) {
        str = [];
        value.forEach(function(val) {
          if(val._id) {
            str.push(val._type + ' ' + val._id);
          } else {
            str.push(val._type + ' ' + val._type);
          }
        })
      } else {
        if(value._id) {
          str += value._type + ' ' + value._id;
        } else {
          str += value._type + ' ' + value._type;
        }
      }
      return str;
    }

    return value;
  }

  var json = function(input) {
    return JSON.stringify(input, jsonFixer);
  }

  var jsonP = function(input, callbackName) {
    if(!callbackName) {
      callbackName = 'callback';
    }
    return '/**/' + callbackName +  '(' + JSON.stringify(input, jsonFixer) + ')';
  };

  var pluralize = function(input, singular, suffix) {
    if(singular && !suffix) {
      suffix = singular;
      singular = '';
    }

    if(!singular && !suffix) {
      suffix = 's';
      singular = '';
    }

    var number = input;

    if(_.isArray(input)) {
      number = input.length;
    }

    if(typeof number !== 'number') {
      return singular;
    }

    if(number > 1 || number === 0) {
      return suffix;
    } 

    return singular;

    return suffix;
  }

  // Down and dirty hack for image classes
  // ![Real Alt Text|class1 class2 class3](src) -> alt="Real Alt Text" class="class1 class2 class3"
  // 
  var imgAltClass = function (input) {
    var re = /(<img.*)?alt=(['"](.*?)\|(.*?)['"])(.*>)/;
    var result = "";
    input.split('\n').forEach(function(e,i) {
      result += e.replace(re,"$1alt=\"$3\" class=\"$4\"$5");
    });
    return result;
  }

  markdown.safe = true;
  linebreaks.safe = true;
  jsonP.safe = true;
  json.safe = true;

  swig.setFilter('upper', upper);
  swig.setFilter('slice', slice);
  swig.setFilter('truncate', truncate);
  swig.setFilter('sort', sort);
  swig.setFilter('startsWith', startsWith);
  swig.setFilter('endsWith', endsWith);
  swig.setFilter('reverse', reverse);
  swig.setFilter('imageSize', imageSize);
  swig.setFilter('imageCrop', imageCrop);
  swig.setFilter('size', size);
  swig.setFilter('groupBy', groupBy);
  swig.setFilter('markdown', markdown);
  swig.setFilter('date', date);
  swig.setFilter('where', where);
  swig.setFilter('relationshipHas', relationshipHas);
  swig.setFilter('exclude', exclude);
  swig.setFilter('duration', duration);
  swig.setFilter('abs', abs);
  swig.setFilter('linebreaks', linebreaks);
  swig.setFilter('pluralize', pluralize);
  swig.setFilter('jsonp', jsonP);
  swig.setFilter('json', json);
  swig.setFilter('imgAltClass',imgAltClass);
};