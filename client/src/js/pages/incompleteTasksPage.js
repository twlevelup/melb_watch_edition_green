'use strict';

var PageView = require('../framework/page');

var IncompleteTasksCollection = require('../collections/incompleteTasks'),
  IncompleteTaskView = require('../views/incompleteTask');

var IncompleteTasksScreen = PageView.extend({

  id: 'incompleteTasks',

  template: require('../../templates/pages/incompleteTasks.hbs'),

  buttonEvents: {
    right: '',
    left: 'goToHomePage',
    top: 'scrollUp',
    bottom: 'scrollDown'
  },

  initialize: function() {
    var self = this;

    this.incompletetasksCollection = new IncompleteTasksCollection();
    this.listenTo(this.incompletetasksCollection, 'change', this.render);

    self.seedTasks();
  },

  // TODO use jquery to load a JSON file async test?
  seedTasks: function() {
    this.incompletetasksCollection.push([
      {taskName: '1', taskDescription: 'Clean floor 1'},
      {taskName: '2', taskDescription: 'Restack books'},
      {taskName: '3', taskDescription: 'Check inventory'}
    ]);
  },


  goToHomePage: function() {
    global.App.navigate('');
  },

  scrollUp: function() {
    $('#watch-face').animate({scrollTop: '-=70px'});
  },

  scrollDown: function() {
    $('#watch-face').animate({scrollTop: '+=70px'});
  },

  render: function() {
    this.$el.html(this.template());
    var IncompleteTasksHTML = document.createDocumentFragment();

    this.incompletetasksCollection.each(function(task) {
      $(IncompleteTasksHTML).append(this.createIncompleteTaskHTML(task));
    }, this);

    this.$el.append(IncompleteTasksHTML);

    return this;
  },

  createIncompleteTaskHTML: function(task) {
      var view = new IncompleteTaskView({
        model: task
      });
      return view.render().el;
    }

});

module.exports = IncompleteTasksScreen;
