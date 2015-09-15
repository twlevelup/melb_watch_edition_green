'use strict';

var Router = require('./framework/router.js'),
  HomePage = require('./pages/homePage'),
  ContactsPage = require('./pages/contactsPage'),
  ListsPage = require('./pages/listsPage'),
  homePage = new HomePage(),
  contactsPage = new ContactsPage(),
  listsPage = new ListsPage();

var AppRouter = Router.extend({

  routes: {
    '': 'home',
    contacts: 'contacts',
    lists: 'lists'
  },

  home: function() {
    this.renderView(homePage);
  },

  contacts: function() {
    this.renderView(contactsPage);
  },
  
  lists: function() {
    this.renderView(listsPage);
  }

});

module.exports = AppRouter;
