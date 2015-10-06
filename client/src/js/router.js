'use strict';

var Router = require('./framework/router.js'),
  HomePage = require('./pages/homePage'),
  IncompleteTasksPage = require('./pages/incompleteTasksPage'),
  DoneTasksPage = require('./pages/doneTasksPage'),
  ContactsPage = require('./pages/contactsPage'),
  homePage = new HomePage(),
  contactsPage = new ContactsPage(),
  incompleteTasksPage = new IncompleteTasksPage(),
  doneTasksPage = new DoneTasksPage();

var AppRouter = Router.extend({

  routes: {
    '': 'home',
    contacts: 'contacts',
    incompleteTasks: 'incompleteTasks',
	doneTasks: 'doneTasks'
  },

  home: function() {
    this.renderView(homePage);
  },

  contacts: function() {
    this.renderView(contactsPage);
  },

  incompleteTasks: function() {
    this.renderView(incompleteTasksPage);
  },
  
   doneTasks: function() {
    this.renderView(doneTasksPage);
  }

});

module.exports = AppRouter;
