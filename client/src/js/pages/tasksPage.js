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

    self.seedContacts();
  },

  // TODO use jquery to load a JSON file async test?
  seedContacts: function() {
    this.tasksCollection.push([
      {name: 'Adam', phoneNumber: '0431 111 111'},
      {name: 'James', phoneNumber: '0431 222 222'},
      {name: 'Marzena', phoneNumber: '0431 333 333'}
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
