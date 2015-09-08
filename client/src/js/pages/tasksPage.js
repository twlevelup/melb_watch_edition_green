'use strict';

var PageView = require('../framework/page');

var TasksCollection = require('../collections/contacts'),
  TasksView = require('../views/contact');

var TasksView = PageView.extend({

  id: 'tasks',

  template: require('../../templates/pages/tasks.hbs'),

  initialize: function() {
    var self = this;

    this.taskCollection = new TasksCollection();
    this.listenTo(this.tasksCollection, 'change', this.render);

    self.seedTasks();
  },


module.exports = TasksView;
