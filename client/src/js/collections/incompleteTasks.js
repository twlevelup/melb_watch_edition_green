var Task = require('../models/incompleteTask');
var Config = require('../config/config.js');

var Tasks = Backbone.Firebase.Collection.extend({
  model: Task,
  url: Config.firebaseUrl + '/Tasks'
});

module.exports = Tasks;
