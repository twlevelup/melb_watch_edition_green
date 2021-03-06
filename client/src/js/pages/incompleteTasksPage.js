'use strict';

var PageView = require('../framework/page');

var IncompleteTasksCollection = require('../collections/incompleteTasks'),
  IncompleteTaskView = require('../views/incompleteTask'),
  DoneTasksCollection = require('../collections/doneTasks');

  var currentItem;
var taskIds;

var IncompleteTasksPage = PageView.extend({


  id: 'incompleteTasks',

  template: require('../../templates/pages/incompleteTasks.hbs'),

  buttonEvents: {
    right: 'goToDoneTasks',
    left: 'goToHomePage',
    top: 'scrollUp',
    bottom: 'scrollDown',
    face: 'faceFunction'
  },

  faceFunction: function()
  {
    if (this.currentItem > -1)
    {
      $('select[name=\'notification_action\'] :nth-child(1)').prop('selected', true);
      $('textarea[name="notification_message').val('Mark task as done: ' + this.taskIds[this.currentItem].get('taskDescription') + '?');
      $('#button-sendNotification').click();
    }
  },

  removeTask: function()
  {
    this.donetasksCollection.add(this.taskIds[this.currentItem]);
    this.incompletetasksCollection.remove(this.taskIds[this.currentItem]);
    if (this.incompletetasksCollection.length > 0)
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

  initialize: function() {
    var self = this;

    this.incompletetasksCollection = new IncompleteTasksCollection();
    this.donetasksCollection = new DoneTasksCollection();
    this.listenTo(this.incompletetasksCollection, 'all', this.render);
    this.listenToOnce(this.incompletetasksCollection, 'sync', function()
    {
      if (Number(this.incompletetasksCollection.length) !== 10)
      {
        this.destroyFirebase();
        self.seedTasks();
      }
    });

    this.currentItem = -1;
  },

  // TODO use jquery to load a JSON file async test?
  seedTasks: function() {
    this.incompletetasksCollection.push([
    {taskNum: '1', taskDescription: 'calibrate the floors'},
    {taskNum: '2', taskDescription: 'empty the delivery trucks'},
    {taskNum: '3', taskDescription: 'service the floors'},
    {taskNum: '4', taskDescription: 'service the back office'},
    {taskNum: '5', taskDescription: 'move the conveyor belts'},
    {taskNum: '6', taskDescription: 'check the printers'},
    {taskNum: '7', taskDescription: 'fill the delivery trucks'},
    {taskNum: '8', taskDescription: 'calibrate the conveyor belts'},
    {taskNum: '9', taskDescription: 'empty the printers'},
    {taskNum: '10', taskDescription: 'service the box-flattener'}
    ]);
  },

  goToHomePage: function() {
    this.currentItem = -1;
    global.App.navigate('');
  },

  goToDoneTasks: function() {
    this.currentItem = -1;
    global.App.navigate('doneTasks');
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
      if (this.incompletetasksCollection.length > 0)
      {
        this.currentItem = this.incompletetasksCollection.length - 1;
      }
      else
		{
  this.currentItem = -1;
		}
    }
    this.highlightScrollUp();
  },

  highlightScrollUp: function(){
    var container = $('#incompleteTasks');
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

    this.highlightScrollDown();
  },

  highlightScrollDown: function(){
    var container = $('#incompleteTasks');
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

  destroyFirebase: function()
  {
    var toDelete = [];
    this.incompletetasksCollection.each(function(task)
    {
      toDelete.push(task);
    });

    for (var i = 0; i < toDelete.length; i = i + 1)
    {
      this.incompletetasksCollection.remove(toDelete[i]);
    }
  },

  render: function() {
    var IncompleteTasksHTML = document.createDocumentFragment();

    this.taskIds = [];
    this.incompletetasksCollection.each(function(task) {
      $(IncompleteTasksHTML).append(this.createIncompleteTaskHTML(task));
      this.taskIds.push(task);
    }, this);

    this.$el.html(this.template());
    this.$el.append(IncompleteTasksHTML);
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

  createIncompleteTaskHTML: function(task) {
      var view = new IncompleteTaskView({
        model: task
      });
      return view.render().el;
    }

});

module.exports = IncompleteTasksPage;
