var Task = require('../models/task');
var Config = require('../config/config.js');

var Tasks = Backbone.Firebase.Collection.extend({
  model: Task,
  url: Config.firebaseUrl + '/Tasks'
});

module.exports = Tasks;
