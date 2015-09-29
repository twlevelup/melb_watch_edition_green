var Task = require('../models/incompleteTask');
var Config = require('../config/config.js');

var Tasks = Backbone.Firebase.Collection.extend({
  model: Task,
  url: Config.firebaseUrl + '/TasksThird'
});

module.exports = Tasks;
