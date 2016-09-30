global.chai = require('chai');
global.expect = global.chai.expect;


global.localStorage = {
    returnValue: '[]',
    getItem : function() {
        return this.returnValue;
    },
    setItem : function(key, value){
        this.lastStoredScore = value;
    }
};

global.window = {
    innerWidth: 1000,
    innerHeight: 1000,
    location: {
        host: 'localhost',
        protocol: 'http'
    }
};

global.navigator = {
    mimeTypes: [],
    userAgent: ''
};

var jsdom = require("jsdom").jsdom;

global.document = jsdom();

// Load test suites
require('./test/App.test.js');
require('./test/Color.test.js');
require('./test/Game.test.js');
require('./test/Hall.test.js');
require('./test/Storage.test.js');
require('./test/Tile.test.js');
require('./test/UI.test.js');

