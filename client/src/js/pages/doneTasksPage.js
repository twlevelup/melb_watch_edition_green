'use strict';

var PageView = require('../framework/page');

var DoneTasksCollection = require('../collections/doneTasks'),
  DoneTaskView = require('../views/doneTask'),
  IncompleteTasksCollection = require('../collections/incompleteTasks');

var DoneTasksScreen = PageView.extend({

  id: 'doneTasks',

  template: require('../../templates/pages/doneTasks.hbs'),

  buttonEvents: {
    right: 'goToHomePage',
    left: 'goToIncompleteTasks',
    top: 'scrollUp',
    bottom: 'scrollDown',
    face: 'faceFunction'
  },

  initialize: function() {
    var self = this;

    this.incompletetasksCollection = new IncompleteTasksCollection();
    this.donetasksCollection = new DoneTasksCollection();
    this.listenTo(this.donetasksCollection, 'all', this.render);
    this.listenToOnce(this.donetasksCollection, 'sync', function()
    {
      if (Number(this.donetasksCollection.length) !== 0)
      {
        this.destroyFirebase();
      }
    });

    this.currentItem = -1;
    // self.seedTasks();
  },

  destroyFirebase: function()
    {
    var toDelete = [];
    this.donetasksCollection.each(function(task)
    {
      toDelete.push(task);
    });

    for (var i = 0; i < toDelete.length; i = i + 1)
    {
      this.donetasksCollection.remove(toDelete[i]);
    }
  },

  faceFunction: function()
  {
    if (this.currentItem > -1)
    {
      $('select[name=\'notification_action\'] :nth-child(2)').prop('selected', true);
      $('textarea[name="notification_message').val('Mark task as not complete: ' + this.taskIds[this.currentItem].get('taskDescription') + '?');
      $('#button-sendNotification').click();
    }
  },

  removeTask: function()
  {
    this.incompletetasksCollection.add(this.taskIds[this.currentItem]);
    this.donetasksCollection.remove(this.taskIds[this.currentItem]);
    if (this.donetasksCollection.length > 0)
    {
      this.currentItem = 0;
      $('#p' + this.taskIds[this.currentItem].get('taskNum')).toggleClass('highlight');
    }
    else
  {
  this.currentItem = -1;
  }

    $('#watch-face').animate({scrollTop: 0});
  },

  // TODO use jquery to load a JSON file async test?
  seedTasks: function() {
    this.donetasksCollection.push([
      {taskName: '1', taskDescription: 'Clean floor 1'},
      {taskName: '2', taskDescription: 'Restack books'},
      {taskName: '3', taskDescription: 'Check inventory'}
    ]);
  },

  goToHomePage: function() {
    this.currentItem = -1;
    global.App.navigate('');
  },

  goToIncompleteTasks: function() {
    this.currentItem = -1;
    global.App.navigate('incompleteTasks');
  },

   scrollUp: function() {
    this.clearToggle();
    if (this.taskIds.length <= 0)
    {
      return;
    }

    this.currentItem = this.currentItem - 1;
    if (this.currentItem < 0)
    {
      if (this.donetasksCollection.length > 0)
      {
        this.currentItem = this.donetasksCollection.length - 1;
      }
      else
    {
  this.currentItem = -1;
    }
}
    var container = $('#doneTasks');
    var scrollTo = $('#p' + this.taskIds[this.currentItem].get('taskNum'));
    var scrollNum = scrollTo.offset().top - container.offset().top + container.scrollTop() - scrollTo.innerHeight() / 2;
    scrollTo.toggleClass('highlight');
    $('#watch-face').animate({scrollTop: scrollNum});
  },

  scrollDown: function() {
    this.clearToggle();
    if (this.taskIds.length <= 0)
    {
      return;
    }

    this.currentItem = this.currentItem + 1;
    if (this.currentItem >= this.taskIds.length)
    {
      this.currentItem = 0;
    }

    var container = $('#doneTasks');
    var scrollTo = $('#p' + this.taskIds[this.currentItem].get('taskNum'));
    var scrollNum = scrollTo.offset().top - container.offset().top + container.scrollTop() - scrollTo.innerHeight() / 2;
    scrollTo.toggleClass('highlight');
    $('#watch-face').animate({scrollTop: scrollNum});
  },

  clearToggle: function()
  {
    for (var i = 0; i < this.taskIds.length; i = i + 1)
    {
      $('#p' + this.taskIds[i].get('taskNum')).toggleClass('highlight', false);
    }
  },

  render: function() {

    var DoneTasksHTML = document.createDocumentFragment();
    this.taskIds = [];

    this.donetasksCollection.each(function(task) {
      $(DoneTasksHTML).append(this.createDoneTaskHTML(task));
      this.taskIds.push(task);
    }, this);
    this.$el.html(this.template());
    this.$el.append(DoneTasksHTML);
    if (this.currentItem >= this.taskIds.length)
    {
      if (Number(this.taskIds.length) === 0)
      {
        this.currentItem = -1;
      }
      else
    {
  this.currentItem = 0;
    }
    }

    return this;
  },

  createDoneTaskHTML: function(task) {
      var view = new DoneTaskView({
        model: task
      });
      return view.render().el;
    }

});

module.exports = DoneTasksScreen;
