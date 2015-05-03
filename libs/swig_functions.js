'use strict';

var utils = require('./utils.js');
var _ = require('lodash');

var slugger = require('uslug');

/**
 * Defines a set of functions usable in all swig templates, are merged into context on render
 * @param  {Object}   swig        Swig engine
 */
module.exports.swigFunctions = function(swig) {

  var self = this;

  this.context = {};
  this.data = {};
  this.settings = {};
  this.typeInfo = {};

  this.paginate = false;
  this.curPage = 1;
  this.maxPage = -1;
  this.pageUrl = 'page-';
  this.paginationBaseUrl = null;
  this.cachedData = {};
  this.CURRENT_URL = '/';

  /**
   * Returns a standard url for a given object, only works for standard scaffolding url structure
   * @param  {Object}   object     Object to generate url for
   * @returns {String}   Url for the object passed in
   */
  var url = function(object) {
    if(typeof object === 'string') {
      var types = getTypes(true);

      object = _.find(types, function(type){ return type.name.toLowerCase() == object.toLowerCase() || type.id.toLowerCase() == object.toLowerCase() });
    }
  
    if(!object) {
      return '';
    }

    if(object.slug) {
      return '/' + object.slug + '/';
    }

    var slug = object.name ? slugger(object.name).toLowerCase() : "";
    var prefix = object._type ? object._type : '';

    var url = '';
    if(prefix) {
      url = '/' + prefix + '/' + slug + '/';
    } else {
      url = '/' + slug + '/';
    }

    return url;
  };

  /**
   * Sets the data set used by all the functions in this class
   * @param  {Object}   data   The data to be used by all functions in this class
   */
  this.setData = function(data) {
    self.cachedData = {};
    self.data = data;
  };

  /**
   * Sets the type info used by all the functions in this class
   * @param  {Object}   typeInfo   The type info to be used by all functions in this class
   */
  this.setTypeInfo = function(typeInfo) {
    self.typeInfo = typeInfo;
  };

  /**
   * Sets the settings used by all the functions in this class
   * @param  {Object}   settings   The settings to be used by all functions in this class
   */
  this.setSettings = function(settings) {
    self.settings = settings;
  };

  /**
   * Returns all content types for a given site
   * @returns  {Array}  An array of type object (slug and name of type)
   */
  var getTypes = function(returnOneOffs) {
    var types = [];

    for(var key in self.typeInfo) {
      if(returnOneOffs || !self.typeInfo[key].oneOff) {

        var slug = key;

        if(self.typeInfo[key] && self.typeInfo[key].customUrls && self.typeInfo[key].customUrls.listUrl) {
          if(!(self.typeInfo[key].customUrls.listUrl === '#')) {
            slug = self.typeInfo[key].customUrls.listUrl;
          }
        }

        types.push({ slug: slug, name: self.typeInfo[key].name, id: key });
      }
    }

    return types;
  };

  /**
   * Returns a published item based off its type and id or a relation string from the CMS
   * @param    {String} Can either be a relation string (from the CMS) or a type name
   * @param    {String} (OPTIONAL) If the first parameter was the type, this must be the ID of the item
   * @returns  {Object} The published item specified by the type/id or relation string passed in
   */
  var getItem = function(type, key, ignorePub) {
    if(!type) {
      return {};
    }

    if(!key) {
      if(Array.isArray(type)) {
        if(type.length > 0) {
          type = type[0];
        } else {
          return {};
        }
      }
      var parts = type.split(" ", 2);
      if(parts.length !== 2) {
        return {};
      }

      type = parts[0];
      key = parts[1];
    }
    
    if(!self.typeInfo[type]) {
      return {};
    }

    var item = null;

    if(self.typeInfo[type].oneOff) {
      item = self.data[type];
    } else {
      item = self.data[type][key];
    }

    if(!item) {
      return {};
    }

    if(!ignorePub && !self.typeInfo[type].oneOff) {
      if(!item.publish_date) {
        return {};
      }

      var now = Date.now();
      var pdate = Date.parse(item.publish_date);

      if(pdate > now + (1 * 60 * 1000)) {
        return {};
      }
    }

    var relationshipFields = [];

    if(self.typeInfo[type] && self.typeInfo[type].controls) {
      self.typeInfo[type].controls.forEach(function(control) {
        if(control.controlType === "relation") {
          relationshipFields.push({ ownerField: null, name: control.name, isSingle: control.meta ? control.meta.isSingle : false });
        } else if (control.controlType === "grid" && control.controls) {
          control.controls.forEach(function(otherControl) {
            if(otherControl.controlType === "relation") {
              relationshipFields.push({ ownerField: control.name, name: otherControl.name, isSingle: otherControl.meta ? otherControl.meta.isSingle : false })
            }
          });
        }
      });
    }

    item = adjustRelationshipFields(relationshipFields, item);

    item._type = type;
    item._id = key;

    if(!item.slug) {
      var tmpSlug = generateSlug(item);
      var prefix = '';

      if(self.typeInfo[type] && self.typeInfo[type].customUrls && self.typeInfo[type].customUrls.listUrl) {
        if(!(self.typeInfo[type].customUrls.listUrl === '#')) {
          prefix = self.typeInfo[type].customUrls.listUrl + '/';
        }
      } else {
        prefix = type + '/';
      }

      if(self.typeInfo[type] && self.typeInfo[type].customUrls && self.typeInfo[type].customUrls.individualUrl) {
        prefix += utils.parseCustomUrl(self.typeInfo[type].customUrls.individualUrl, item) + '/';
      }

      prefix += tmpSlug;

      item.slug = prefix;
    }

    return item;
  };

  /**
   * Returns an array of items from a relation
   * @param    {Array}  An array of relation strings from the CMS
   * @returns  {Array}  All published items specified by relation strings
   */
  var getItems = function(arr, ignorePub) {
    if(!arr) {
      return [];
    }
    var items = [];

    arr.forEach(function(itm) {
      var obj = getItem(itm, null, ignorePub);
      if(!_.isEmpty(obj)) {
        items.push(obj);
      }
    });

    return items;
  }

  var generatedSlugs = {};
  var generateSlug = function(value) {
    if(!generatedSlugs[value._type]) {
      generatedSlugs[value._type] = {};
    }

    if(value.slug) {
      generatedSlugs[value._type][value.slug] = true;
      return value.slug;
    }

    var tmpSlug = slugger(value.name).toLowerCase();

    var no = 2;
    while(generatedSlugs[value._type][tmpSlug]) {
      tmpSlug = slugger(value.name).toLowerCase() + '_' + no;
      no++;
    }

    generatedSlugs[value._type][tmpSlug] = true;

    return tmpSlug;
  }


  var adjustRelationshipFields = function(fields, object) {
    // If owner field, then name is a sub field on another object and we need to iterate through its
    var adjustField = function(object, field) {

      var val = object[field.name];

      if(field.isSingle) {
        Object.defineProperty(object, field.name, {
          enumerable: true,
          configurable: true,
          get: function() {
            if(!val) return val;
            return getItem(val);
          }
        });
        Object.defineProperty(object, '_' + field.name, {
          enumerable: false,
          configurable: true,
          get: function() {
            if(!val) return val;

            return getItem(val, null, true);
          }
        });
      } else {
        Object.defineProperty(object, field.name, {
          enumerable: true,
          configurable: true,
          get: function() {
            if(!val) return val;
            return getItems(val);
          }
        });

        Object.defineProperty(object, '_' + field.name, {
          enumerable: false,
          configurable: true,
          get: function() {
            if(!val) return val;

            return getItems(val, true);
          }
        });
      }
    }

    fields.forEach(function(field) {
      if(field.ownerField) {
        // This is a grid
        var gridArray = object[field.ownerField];

        if(!gridArray) {
          return;
        }

        gridArray.forEach(function(gridItem) {
          var desc = Object.getOwnPropertyDescriptor(gridItem, field.name);
          if(desc && desc.get) { // Don't double dip
            return;
          }

          adjustField(gridItem, field);
        });
      } else {
        var desc = Object.getOwnPropertyDescriptor(object, field.name);
        if(desc && desc.get) { // Don't double dip
          return;
        }

        adjustField(object, field);
      }

    });

    return object;
  }

  /**
   * Returns all the data specified by the arguments
   * @param    {String} Name of type to retrieve data for
   * @param    {String} (optional) Other type to return with this data, can specifiy as many types as needed
   * @returns  {Array}  All items from type (or types)
   */
  var getCombined = function() {
    var names = [].slice.call(arguments, 0);

    if(names.length === 0) {
      return [];
    }

    var lastName = names[names.length - 1];
    var includeAll = false;

    if(typeof lastName === 'boolean') {
      includeAll = lastName;
      names.pop();
    }

    if(self.cachedData[names.join(',') + ',' + includeAll])
    {
      return self.cachedData[names.join(',') + ',' + includeAll];
    }

    generatedSlugs = {};
    var data = [];
    names.forEach(function(name) {
      var tempData = self.data[name] || {};

      var relationshipFields = [];

      if(self.typeInfo[name] && self.typeInfo[name].controls) {
        self.typeInfo[name].controls.forEach(function(control) {
          if(control.controlType === "relation") {
            relationshipFields.push({ ownerField: null, name: control.name, isSingle: control.meta ? control.meta.isSingle : false });
          } else if (control.controlType === "grid" && control.controls) {
            control.controls.forEach(function(otherControl) {
              if(otherControl.controlType === "relation") {
                relationshipFields.push({ ownerField: control.name, name: otherControl.name, isSingle: otherControl.meta ?  otherControl.meta.isSingle : false })
              }
            });
          }
        });
      }

      if(self.typeInfo[name] && self.typeInfo[name].oneOff) {
        tempData = adjustRelationshipFields(relationshipFields, tempData);
        data = tempData;
        return;
      }

      tempData = _.omit(tempData, function(value, key) { return key.indexOf('_') === 0; });

      var no = 1;
      // convert it into an array
      tempData = _.map(tempData, function(value, key) { 
        var tmpSlug = "";

        value._id = key; 
        value._type = name; 

        if(value.name)  {
          if(!value.slug) {
            var tmpSlug = generateSlug(value);
            var prefix = '';

            if(self.typeInfo[name] && self.typeInfo[name].customUrls && self.typeInfo[name].customUrls.listUrl) {
              if(!(self.typeInfo[name].customUrls.listUrl === '#')) {
                prefix = self.typeInfo[name].customUrls.listUrl + '/';
              }
            } else {
              prefix = name + '/';
            }

            if(self.typeInfo[name] && self.typeInfo[name].customUrls && self.typeInfo[name].customUrls.individualUrl) {
              prefix += utils.parseCustomUrl(self.typeInfo[name].customUrls.individualUrl, value) + '/';
            }

            prefix += tmpSlug;

            value.slug = prefix;
          }
        }

        value = adjustRelationshipFields(relationshipFields, value);

        return value;
      });
      tempData = _.filter(tempData, function(item) { 
        if(!includeAll && !item.publish_date) {
          return false;
        }

        var now = Date.now();
        var pdate = Date.parse(item.publish_date);

        if(pdate > now + (1 * 60 * 1000)) {
          return false;
        }

        return true;
      });

      data = data.concat(tempData);
    });

    
    self.cachedData[names.join(',') + ',' + includeAll] = data;

    return data;
  };

  var paginate = function(data, perPage, pageName) {
    if(self.curPage === 1 && self.paginate === true)
    {
      throw new Error('Can only paginate one set of data in a template.');
    }

    var items = utils.slice(data, perPage, perPage * (self.curPage-1));
    self.paginate = true;

    if(self.paginationBaseUrl === null) {
      self.paginationBaseUrl = self.CURRENT_URL;
    }

    self.pageUrl = pageName || self.pageUrl;
    self.maxPage = Math.ceil(_(data).size() / perPage);

    return items;
  };

  var getCurPage = function() {
    return self.curPage;
  };

  var getMaxPage = function() {
    return self.maxPage;
  };

  var getPageUrl = function(pageNum) {
    if(pageNum == 1) {
      return self.paginationBaseUrl;
    }

    return self.paginationBaseUrl + self.pageUrl + pageNum + '/';
  };

  var getCurrentUrl = function() {
    return self.CURRENT_URL;
  };

  var getSetting = function(key) {
    if(!self.settings.general) {
      return null;
    }

    return self.settings.general[key];
  };

  var randomElement = function(array) {
    if(!array || !_.isArray(array)) {
      return null;
    }

    var index = [Math.floor(Math.random() * array.length)];
    return array[index];
  };

  var sortItems = function(input, property, reverse) {

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

  var nextItem = function(item, sort_name, reverse_sort) {
    var type = item._type;
    var items = getCombined(type);

    if(sort_name) {
      items = sortItems(items, sort_name, reverse_sort);
    }

    var nextItem = null;
    var previousItem = null;

    items.some(function(itm) {
      if(previousItem && previousItem._id == item._id) {
        nextItem = itm;
        return true;
      }

      previousItem = itm;
    });

    return nextItem;
  };

  var prevItem = function(item, sort_name, reverse_sort) {
    var type = item._type;
    var items = getCombined(type);

    if(sort_name) {
      items = sortItems(items, sort_name, reverse_sort);
    }

    var returnItem = null;
    var previousItem = null;

    items.some(function(itm) {
      if(itm._id == item._id) {
        returnItem = previousItem;
        return true;
      }

      previousItem = itm;
    });

    return returnItem;
  };

  var merge = function() {
    var arrs = [].slice.call(arguments, 0);

    var newArr = [];

    arrs.forEach(function(arr) {
      if(arr !== '' && arr !== null)
        newArr = newArr.concat(arr);
    })

    return newArr;
  }

  // FUNCTIONS USED FOR PAGINATION HELPING, IGNORE FOR MOST CASES
  this.shouldPaginate = function() {
    return self.curPage <= self.maxPage;
  };

  // Reset initial data
  this.init = function() {
    self.paginate = false;
    self.curPage = 1;
    self.pageUrl = 'page-'
    self.maxPage = -1;
    self.paginationBaseUrl = null;
  };

  this.increasePage = function() {
    self.curPage = self.curPage + 1;
  };
  
  this.setParams = function(params) {
    for(var key in params) {
      self[key] = params[key];
    }
  };

  this.getFunctions = function() {
    var functions = {
      get: getCombined,
      getItem: function(type, key, ignorePub) {
        if(typeof type === 'string' && key) {
          return getItem(type, key, ignorePub);
        }

        return type;
      },
      _realGetItem: function(type, key, ignorePub) {
        return getItem(type, key, ignorePub);
      },
      getItems: function(holder) {
        return holder;
      },
      getTypes: getTypes,
      paginate: paginate,
      getCurPage: getCurPage,
      getMaxPage: getMaxPage,
      getPageUrl: getPageUrl,
      url: url,
      getCurrentUrl: getCurrentUrl,
      getSetting: getSetting,
      random: randomElement,
      cmsVersion: 'v2',
      merge: merge,
      nextItem: nextItem,
      prevItem: prevItem
    };

    var types = [];
    for(var type in self.typeInfo) {
      types.push(type);
    }

    var cms = {};

    types.forEach(function(type) {

      Object.defineProperty(cms, type, {
        get: function() { return getCombined(type); },
        enumerable: true,
        configurable: true
      })

    });

    functions['cms'] = cms;

    Object.defineProperty(functions, 'cms_types', {
      get: function() { return getTypes() },
      enumerable: true,
      configurable: true
    })

    return functions;
  };


  return this;
};