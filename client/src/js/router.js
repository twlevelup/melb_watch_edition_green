'use strict';

var Router = require('./framework/router.js'),
  HomePage = require('./pages/homePage'),
  TasksPage = require('./pages/tasksPage'),
  ContactsPage = require('./pages/contactsPage'),
  homePage = new HomePage(),
  contactsPage = new ContactsPage(),
  tasksPage = new TasksPage();

var AppRouter = Router.extend({

  routes: {
    '': 'home',
    contacts: 'contacts',
    tasks: 'tasks'
  },

  home: function() {
    this.renderView(homePage);
  },

  contacts: function() {
    this.renderView(contactsPage);
  },

  tasks: function() {
    this.renderView(tasksPage);
  }

});

module.exports = AppRouter;
