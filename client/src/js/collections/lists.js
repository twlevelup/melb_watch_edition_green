var List = require('../models/lists');
var Config = require('../config/config.js');

var Lists = Backbone.Firebase.Collection.extend({
  model: List,
  url: Config.firebaseUrl + '/Lists'
});

module.exports = Lists;
