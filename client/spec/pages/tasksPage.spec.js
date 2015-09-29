'use strict';

var TaskPage = require('../../src/js/pages/tasksPage'),
  Router = require('../../src/js/router'),
  App = require('../../src/js/app');

global.App = App;

describe('The Task Page', function() {
  var taskPage;

  beforeEach(function() {
    taskPage = new TaskPage();
  });

  describe('button event handlers', function() {

    describe('right', function() {

      it('should take the user to the contacts page', function() {
        spyOn(global.App, 'navigate');
        taskPage.setButtonEvents();
        taskPage.trigger('right');
        expect(global.App.navigate).toHaveBeenCalledWith('contacts');
      });
    });

    describe('top', function() {
      it('should scroll the watch face up', function() {
        spyOn(taskPage, 'scrollUp');
        taskPage.setButtonEvents();
        taskPage.trigger('top');
        expect(taskPage.scrollUp).toHaveBeenCalled();
      });
    });

    describe('bottom', function() {
      it('should scroll the watch face down', function() {
        spyOn(taskPage, 'scrollDown');
        taskPage.setButtonEvents();
        taskPage.trigger('bottom');
        expect(taskPage.scrollDown).toHaveBeenCalled();
      });
    });

  });

  describe('rendering', function() {

    it('should produce the correct HTML', function() {
      taskPage.render();
      expect(taskPage.$el).toContainText('Task');
    });

    it('returns the view object', function() {
      expect(taskPage.render()).toEqual(taskPage);
    });

  });

});
