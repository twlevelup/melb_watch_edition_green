'use strict';

var ListsPage = require('../../src/js/pages/listsPage'),
  Router = require('../../src/js/router.js'),
  App = require('../../src/js/app');

global.App = App;

describe('The Lists Page', function() {

  var listsPage;

  beforeEach(function() {
    listsPage = new ListsPage();
  });

  describe('lists data', function() {

    it('should have a lists collection', function() {
      expect(listsPage.listCollection).toBeDefined();
    });

    describe('loading data', function() {
      it('should load the data from ...');
    });

  });

  describe('button events', function() {

    beforeEach(function() {
      listsPage.setButtonEvents();
    });

    describe('right', function() {
      it('should take the user to the home page', function() {
        spyOn(global.App, 'navigate');
        listsPage.trigger('right');
        expect(global.App.navigate).toHaveBeenCalledWith('');
      });
    });

    describe('face', function() {
      it('should display "Oh noes!" to the user', function() {
        listsPage.render();
        listsPage.trigger('face');
        expect(listsPage.$el).toContainText('Oh noes!');
      });
    });
  });

  describe('rendering', function() {

    it('should produce the correct HTML', function() {
      listsPage.render();
      expect(listsPage.$el).toContainHtml('<h1>Lists</h1>');
    });

    it('should render each of the lists', function() {
      spyOn(listsPage, 'createListsHTML');
      listsPage.listCollection.reset([{}, {}, {}, {}]);
      listsPage.render();
      expect(listsPage.createListsHTML.calls.count()).toEqual(4);
    });

    it('returns the view object', function() {
      expect(listsPage.render()).toEqual(listsPage);
    });

  });

});
