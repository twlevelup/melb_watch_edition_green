'use strict';

var TaskPage = require('../../src/js/pages/doneTasksPage'),
  Router = require('../../src/js/router'),
  App = require('../../src/js/app');

global.App = App;

describe('The Done Tasks', function() {
  var DoneTaskPage;

  beforeEach(function() {
    DoneTaskPage = new TaskPage();
  });

  describe('button event handlers', function() {

    describe('left', function() {

      it('should take the user to the incomplete tasks page', function() {
        spyOn(global.App, 'navigate');
        DoneTaskPage.setButtonEvents();
        DoneTaskPage.trigger('left');
        expect(global.App.navigate).toHaveBeenCalledWith('incompleteTasks');
      });
    });

    describe('right', function() {

      it('should take the user to the home page', function() {
        spyOn(global.App, 'navigate');
        DoneTaskPage.setButtonEvents();
        DoneTaskPage.trigger('right');
        expect(global.App.navigate).toHaveBeenCalledWith('');
      });
    });

    describe('top', function() {
      it('should scroll the watch face up', function() {
        spyOn(DoneTaskPage, 'scrollUp');
        DoneTaskPage.setButtonEvents();
        DoneTaskPage.trigger('top');
        expect(DoneTaskPage.scrollUp).toHaveBeenCalled();
      });
    });

    describe('bottom', function() {
      it('should scroll the watch face down', function() {
        spyOn(DoneTaskPage, 'scrollDown');
        DoneTaskPage.setButtonEvents();
        DoneTaskPage.trigger('bottom');
        expect(DoneTaskPage.scrollDown).toHaveBeenCalled();
      });
    });

  });

  describe('rendering', function() {

    it('should produce the correct HTML', function() {
      DoneTaskPage.render();
      expect(DoneTaskPage.$el).toContainText('Task');
    });

    it('returns the view object', function() {
      expect(DoneTaskPage.render()).toEqual(DoneTaskPage);
    });

  });

});
