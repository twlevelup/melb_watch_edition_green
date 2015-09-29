'use strict';

var Router = require('./framework/router.js'),
  HomePage = require('./pages/homePage'),
  IncompleteTasksPage = require('./pages/incompleteTasksPage'),
  ContactsPage = require('./pages/contactsPage'),
  homePage = new HomePage(),
  contactsPage = new ContactsPage(),
  incompleteTasksPage = new IncompleteTasksPage();

var AppRouter = Router.extend({

  routes: {
    '': 'home',
    contacts: 'contacts',
    incompleteTasks: 'incompleteTasks'
  },

  home: function() {
    this.renderView(homePage);
  },

  contacts: function() {
    this.renderView(contactsPage);
  },

  incompleteTasks: function() {
    this.renderView(incompleteTasksPage);
  }

});

module.exports = AppRouter;
