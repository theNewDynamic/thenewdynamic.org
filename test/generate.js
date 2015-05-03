var assert = require("assert");
var fs = require('fs');

var config = {
  get: function(key) {
    return this[key];
  },
  webhook: {
    firebase: 'webhook',
    secretKey: '5e13aef1-8aa8-41b4-8619-2eaf62c0ae49',
    siteName: 'test'
  },
  connect: {
    'wh-server': {
      options: {
        livereload: 35730
      }
    }
  }
}

var fileParser = {
  readJSON: function(file) {
    var data = fs.readFileSync(file);

    return JSON.parse(data);
  }
}

var generator = require('../libs/generator.js').generator(config, {}, null, fileParser);

// Set up all the data here

describe('generator', function(){
  describe('#renderPages(done, cb)', function(){
    before(function(done) {
      generator.renderPages(done, function(cb) { cb(); });
    })
    it('should render html files in the pages directory', function(){
    })
    it('should render robots.txt in the pages directory', function(){
    })
    it('should render _supported.js in the build directory', function(){
    })
    it('should render XML, RSS, XHTML, and ATOM in the pages directory', function(){
    })
  })
})

describe('generator', function(){
  describe('#renderTemplates(done, cb)', function(){
    before(function(done) {
      generator.renderTemplates(done, function(cb) { cb(); });
    })
    // Check .slug vs not .slug
    // Need Three Types. One that has no custom urls, type url only, invidivual url only, and both
    it('should render the templates for the site', function(){
    })
    it('should handle no custom slugs', function(){
    })
    it('should handle custom type slugs', function(){
    })
    it('should handle custom item slugs', function(){
    })
    it('should handle custom type and item slugs', function(){
    })
    it('should handle sub templates', function(){
    })
  })
})

describe('generator', function(){
  describe('#copyStatic(callback)', function(){
    it('should copy the static files to build', function(){
    })
  })
})

describe('generator', function(){
  describe('#cleanFiles(done, cb)', function(){
    it('should remove the build folder', function(){
    })
  })
})

describe('generator', function(){
  describe('#buildBoth(done, cb)', function(){
    it('should render both the pages and templates', function(){
    })
  })
})

describe('generator', function(){
  describe('#checkScaffoldingMD5(name, callback)', function(){
    it('should return the MD5s for templates', function(){
    })
  })
})

describe('generator', function(){
  describe('#makeScaffolding(name, done, force)', function(){
    it('should generate scaffolding for a given type', function(){
    })
  })
})

describe('generator', function(){
  describe('#reloadFiles(done)', function(){
    it('should send reload signal to live reload', function(){
    })
  })
})

describe('generator', function(){
  describe('#startLiveReload()', function(){
    it('should start live reload server', function(){
    })
  })
})

describe('generator', function(){
  describe('#webListener()', function(){
    // Test all the different messages here
    // Create a websocket to talk to web listener, will use in sendSockMessage as well
    it('should render the templates for the site', function(){
    })
  })
})

describe('generator', function(){
  describe('#sendSockMessage(message)', function(){
    it('should send a message over websocket', function(){
    })
  })
})


describe('generator', function(){
  describe('#init(sitename, secretkey, copyCms, firebase, done)', function(){
    it('should initialized the firebase conf and cms', function(){
    })
  })
})

describe('generator', function(){
  describe('#assets(grunt)', function(){
    it('should render the templates for the site', function(){
    })
  })
})

describe('generator', function(){
  describe('#assetsMiddle(grunt)', function(){
    it('should render the templates for the site', function(){
    })
  })
})

describe('generator', function(){
  describe('#assetsAfter(grunt)', function(){
    it('should render the templates for the site', function(){
    })
  })
})

describe('generator', function(){
  describe('#enableStrictMode()', function(){
    it('should enable strict mode in generator', function(){
    })
  })
})