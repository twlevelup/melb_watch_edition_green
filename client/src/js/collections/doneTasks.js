var Task = require('../models/doneTask');
var Config = require('../config/config.js');

var Tasks = Backbone.Firebase.Collection.extend({
  model: Task,
  url: Config.firebaseUrl + '/TasksDone'
});

module.exports = Tasks;
