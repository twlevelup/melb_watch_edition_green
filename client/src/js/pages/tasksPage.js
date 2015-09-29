'use strict';

var PageView = require('../framework/page');

var TasksCollection = require('../collections/tasks'),
  TaskView = require('../views/task');

var tasksScreen = PageView.extend({

  id: 'tasks',

  template: require('../../templates/pages/tasks.hbs'),

  buttonEvents: {
    right: 'goToContacts',
    top: 'scrollUp',
    bottom: 'scrollDown'
  },

  initialize: function() {
    var self = this;

    this.tasksCollection = new TasksCollection();
    this.listenTo(this.tasksCollection, 'change', this.render);
	//this.tasksCollection.each(function(temp)
	//{
	//	this.tasksCollection.remove(temp);
	//});
    //self.seedTasks();
  },

  // TODO use jquery to load a JSON file async test?
  seedTasks: function() {
    this.tasksCollection.push([
		{taskNum: '1', taskDescription: 'calibrate the floors'},
		{taskNum: '2', taskDescription: 'empty the delivery trucks'},
		{taskNum: '3', taskDescription: 'service the floors'},
		{taskNum: '4', taskDescription: 'service the back office'},
		{taskNum: '5', taskDescription: 'move the conveyor belts'},
		{taskNum: '6', taskDescription: 'check the printers'},
		{taskNum: '7', taskDescription: 'fill the delivery trucks'},
		{taskNum: '8', taskDescription: 'calibrate the conveyor belts'},
		{taskNum: '9', taskDescription: 'empty the printers'},
		{taskNum: '10', taskDescription: 'service the box-flattener'}
    ]);
  },

  goToContacts: function() {
    global.App.navigate('contacts');
  },

  scrollUp: function() {
    $('#watch-face').animate({scrollTop: '-=70px'});
  },

  scrollDown: function() {
    $('#watch-face').animate({scrollTop: '+=70px'});
  },

  render: function() {
    this.$el.html(this.template());
    var tasksHTML = document.createDocumentFragment();

    this.tasksCollection.each(function(task) {
      $(tasksHTML).append(this.createContactHTML(task));
    }, this);

    this.$el.append(tasksHTML);

    return this;
  },

  createContactHTML: function(task) {
      var view = new TaskView({
        model: task
      });
      return view.render().el;
    }

});

module.exports = tasksScreen;
