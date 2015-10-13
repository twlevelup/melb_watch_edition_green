'use strict';

var PageView = require('../framework/page');

var DoneTasksCollection = require('../collections/doneTasks'),
  DoneTaskView = require('../views/doneTask');

var DoneTasksScreen = PageView.extend({

  id: 'doneTasks',

  template: require('../../templates/pages/doneTasks.hbs'),

  buttonEvents: {
    right: 'goToHomePage',
    left: 'goToIncompleteTasks',
    top: 'scrollUp',
    bottom: 'scrollDown'
  },

  initialize: function() {
    var self = this;

    this.donetasksCollection = new DoneTasksCollection();
    this.listenTo(this.donetasksCollection, 'all', this.render);
    this.listenToOnce(this.donetasksCollection, 'sync', function()
    {
      if (Number(this.donetasksCollection.length) !== 0)
      {
        this.destroyFirebase();
      }
    });

    // self.seedTasks();
  },

  destroyFirebase: function()
    {
    var toDelete = [];
    this.donetasksCollection.each(function(task)
    {
      toDelete.push(task);
    });

    for (var i = 0; i < toDelete.length; i = i + 1)
    {
      this.donetasksCollection.remove(toDelete[i]);
    }
  },

  // TODO use jquery to load a JSON file async test?
  seedTasks: function() {
    this.donetasksCollection.push([
      {taskName: '1', taskDescription: 'Clean floor 1'},
      {taskName: '2', taskDescription: 'Restack books'},
      {taskName: '3', taskDescription: 'Check inventory'}
    ]);
  },

  goToHomePage: function() {
    global.App.navigate('');
  },

  goToIncompleteTasks: function() {
    global.App.navigate('incompleteTasks');
  },

  scrollUp: function() {
    $('#watch-face').animate({scrollTop: '-=70px'});
  },

  scrollDown: function() {
    $('#watch-face').animate({scrollTop: '+=70px'});
  },

  render: function() {
    this.$el.html(this.template());
    var DoneTasksHTML = document.createDocumentFragment();

    this.donetasksCollection.each(function(task) {
      $(DoneTasksHTML).append(this.createDoneTaskHTML(task));
    }, this);

    this.$el.append(DoneTasksHTML);

    return this;
  },

  createDoneTaskHTML: function(task) {
      var view = new DoneTaskView({
        model: task
      });
      return view.render().el;
    }

});

module.exports = DoneTasksScreen;
