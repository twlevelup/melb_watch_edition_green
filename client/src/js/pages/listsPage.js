'use strict';

var PageView = require('../framework/page');

var ListsCollection = require('../collections/lists'),
  ListsView = require('../views/lists');

var ListsView = PageView.extend
({

  id: 'lists',

  template: require('../../templates/pages/lists.hbs'),
  
    buttonEvents: {
    right: 'goToHomePage',
    face: 'screenClickExample',
    left: 'goToContactPage'
  },

  initialize: function() 
  {
    var self = this;

    this.listCollection = new ListsCollection();
    this.listenTo(this.listCollection, 'change', this.render);

    self.seedLists();
  },
  
  screenClickExample: function() {
    this.$el.html('<div>Oh noes!</div>');
  },

  goToHomePage: function() {
    global.App.navigate('');
  },
  
  /*render: function() {

    this.$el.html(this.template());

    var listsHTML = document.createDocumentFragment();

    this.listCollection.each(function(lists) {
      $(listsHTML).append(this.createListHTML(lists));
    }, this);

    this.$el.append(listsHTML);

    return this;
  },*/

  createListHTML: function(lists) 
  {
      var view = new ListsView({
        model: lists
      });
      return view.render().el;
    },
    
   render: function() {

    this.$el.html(this.template());

    var listsHTML = document.createDocumentFragment();

    this.listCollection.each(function(lists) {
      $(listsHTML).append(this.createListsHTML(lists));
    }, this);

    this.$el.append(listsHTML);

    return this;
  },
  
    seedLists: function() {
    this.listCollection.push([
      {name: 'Adam', phoneNumber: '0431 111 111'},
      {name: 'James', phoneNumber: '0431 222 222'},
      {name: 'Marzena', phoneNumber: '0431 333 333'}
    ]);
	},
  });
  


module.exports = ListsView;
