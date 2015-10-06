'use strict';

var PageView = require('../framework/page');

var homeScreen = PageView.extend({

  id: 'home',

  template: require('../../templates/pages/home.hbs'),

  buttonEvents: {
    right: 'goToIncompleteTasks',
	left: 'goToDoneTasks',
    top: 'scrollUp',
    bottom: 'scrollDown'
  },

  goToIncompleteTasks: function() {
    global.App.navigate('incompleteTasks');
  },
  
    goToDoneTasks: function() {
    global.App.navigate('doneTasks');
  },

  scrollUp: function() {
    $('#watch-face').animate({scrollTop: '-=70px'});
  },

  scrollDown: function() {
    $('#watch-face').animate({scrollTop: '+=70px'});
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});

module.exports = homeScreen;
