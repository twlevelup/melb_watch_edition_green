'use strict';

var TaskPage = require('../../src/js/pages/incompleteTasksPage'),
  Router = require('../../src/js/router'),
  App = require('../../src/js/app');

global.App = App;

describe('The Incomplete Tasks', function() {
  var IncompleteTaskPage;

  beforeEach(function() {
    IncompleteTaskPage = new TaskPage();
  });

  describe('button event handlers', function() {

    describe('left', function() {

      it('should take the user to the home page', function() {
        spyOn(global.App, 'navigate');
        IncompleteTaskPage.setButtonEvents();
        IncompleteTaskPage.trigger('left');
        expect(global.App.navigate).toHaveBeenCalledWith('');
      });
    });

    describe('top', function() {

      it('should scroll the watch face up', function() {
        spyOn(IncompleteTaskPage, 'scrollUp');
        IncompleteTaskPage.setButtonEvents();
        IncompleteTaskPage.trigger('top');
        expect(IncompleteTaskPage.scrollUp).toHaveBeenCalled();
      });
    });

    describe('bottom', function() {
      it('should scroll the watch face down', function() {
        spyOn(IncompleteTaskPage, 'scrollDown');
        IncompleteTaskPage.setButtonEvents();
        IncompleteTaskPage.trigger('bottom');
        expect(IncompleteTaskPage.scrollDown).toHaveBeenCalled();
      });
    });

  });

  fdescribe('swap', function() {
    it('should swap tasks', function() {
      /*var Task = require('../../src/js/models/incompleteTask');
      var Tasks = Backbone.Collection.extend({
        model: Task,

      });
      var Tasks2 = Backbone.Collection.extend({
        model: Task,

      });
      var floor = {taskNum: '1', taskDescription: 'calibrate the floors'};
      IncompleteTaskPage.swap(Tasks, Tasks2,floor);*/
    //   var IncompleteTasksCollection = require('../collections/incompleteTasks');
    //   var DoneTasksCollection = require('../collections/doneTasks');
    //   var incompletetasksCollection = new IncompleteTasksCollection();
    //   var donetasksCollection = new DoneTasksCollection();
    //   var sample = [{taskName: '99', taskDescription: 'What tests'}];
    //   var hasSample = false;
    //   incompletetasksCollection.add(sample);
    //   //incompletetasksCollection.each(function(task)
    //   // {
    //   //     if (task == sample)
    //   //     {
    //   //         hasSample = true;
    //   //     }
    //   // });
    // var something = incompletetasksCollection.find(sample);
    //   expect(something.length > 0);

      var incompleteTasksPage = new TaskPage();
      incompleteTasksPage.destroyFirebase();
      incompleteTasksPage.seedTasks();

      expect(incompleteTasksPage.incompletetasksCollection.length).toEqual(10);
      expect(incompleteTasksPage.donetasksCollection.length).toEqual(0);

      incompleteTasksPage.currentItem = 1;
      incompleteTasksPage.removeTask();

      expect(incompleteTasksPage.incompletetasksCollection.length).toEqual(9);
      expect(incompleteTasksPage.donetasksCollection.length).toEqual(1);

    });
  });

  describe('rendering', function() {

    it('should produce the correct HTML', function() {
      IncompleteTaskPage.render();
      expect(IncompleteTaskPage.$el).toContainText('Task');
    });

    it('returns the view object', function() {
      expect(IncompleteTaskPage.render()).toEqual(IncompleteTaskPage);
    });

  });

});
