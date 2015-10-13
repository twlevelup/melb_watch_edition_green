// 'use strict';

// var TaskPage = require('../../src/js/pages/IncompleteTasksPage'),
  // Router = require('../../src/js/router'),
  // App = require('../../src/js/app');

// global.App = App;

// describe('The Incomplete Tasks', function() {
  // var IncompleteTaskPage;

  // beforeEach(function() {
    // IncompleteTaskPage = new TaskPage();
  // });

  // describe('button event handlers', function() {

    // describe('left', function() {

      // it('should take the user to the home page', function() {
        // spyOn(global.App, 'navigate');
        // IncompleteTaskPage.setButtonEvents();
        // IncompleteTaskPage.trigger('left');
        // expect(global.App.navigate).toHaveBeenCalledWith('');
      // });
    // });

    // describe('top', function() {

      // it('should scroll the watch face up', function() {
        // spyOn(IncompleteTaskPage, 'scrollUp');
        // IncompleteTaskPage.setButtonEvents();
        // IncompleteTaskPage.trigger('top');
        // expect(IncompleteTaskPage.scrollUp).toHaveBeenCalled();
      // });
    // });

    // describe('bottom', function() {
      // it('should scroll the watch face down', function() {
        // spyOn(IncompleteTaskPage, 'scrollDown');
        // IncompleteTaskPage.setButtonEvents();
        // IncompleteTaskPage.trigger('bottom');
        // expect(IncompleteTaskPage.scrollDown).toHaveBeenCalled();
      // });
    // });

  // });

  // describe('swap', function() {
    // it('should swap tasks', function() {
      // var Tasks = Backbone.Collection.extend({
        // model: Task,

      // });
      // var Tasks2 = Backbone.Collection.extend({
        // model: Task,

      // });
      // var floor = {taskNum: '1', taskDescription: 'calibrate the floors'};
      // IncompleteTaskPage.swap(Tasks, Tasks2,floor);
    // });
  // });

  // describe('rendering', function() {

    // it('should produce the correct HTML', function() {
      // IncompleteTaskPage.render();
      // expect(IncompleteTaskPage.$el).toContainText('Task');
    // });

    // it('returns the view object', function() {
      // expect(IncompleteTaskPage.render()).toEqual(IncompleteTaskPage);
    // });

  // });

// });
