'use strict';

var PageView = require('../framework/page');

var IncompleteTasksCollection = require('../collections/incompleteTasks'),
  IncompleteTaskView = require('../views/incompleteTask');
  
  var current_item;
var taskIds;

var IncompleteTasksScreen = PageView.extend({

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
		$("select[name='notification_action'] :nth-child(1)").prop("selected", true);
		$('textarea[name="notification_message').val("Mark task as done: " + this.taskIds[this.current_item].get('taskDescription') + "?");
		$("#button-sendNotification").click();
  },
  
  
  removeTask: function()
  {
	this.incompletetasksCollection.remove(this.taskIds[this.current_item]);
	if (this.incompletetasksCollection.length > 0)
	{
		this.current_item = 0;
		$("#p" + this.taskIds[this.current_item].get('taskNum')).toggleClass("highlight");
	}
	else
	{
		this.current_item = -1;
	}
	$('#watch-face').animate({scrollTop: 0});
  },

  initialize: function() {
    var self = this;

    this.incompletetasksCollection = new IncompleteTasksCollection();
    this.listenTo(this.incompletetasksCollection, 'all', this.render);
	this.listenToOnce(this.incompletetasksCollection, 'sync', function()
	{
		if(Number(this.incompletetasksCollection.length) !== 10)
		{
			//console.log("synced");
			this.destroyFirebase();
			self.seedTasks();
		}
	});
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
    global.App.navigate('');
  },
  
  goToDoneTasks: function() {
	global.App.navigate('doneTasks');
	},

	scrollUp: function() {
	this.clearToggle();
	if (this.taskIds.length <= 0)
	  {
		return;
	  }
	  this.current_item = this.current_item-1;
	if (this.current_item < 0)
	{
		if(this.incompletetasksCollection.length > 0)
		{
			this.current_item = this.incompletetasksCollection.length-1;
		}
		else
		{
			this.current_item = -1;
		}
	}
	//console.log("a " + this.taskIds[this.current_item].get('id'));
	IncompleteTasksScreen.currentTaskId = this.taskIds[this.current_item].get('id');
	var container = $('#incompleteTasks');
	//console.log("removing" + $("#p" + this.taskIds[this.current_item].get('taskNum')));
	var scrollTo = $("#p" + this.taskIds[this.current_item].get('taskNum'));
	var scrollNum = scrollTo.offset().top - container.offset().top + container.scrollTop() - scrollTo.innerHeight()/2;
	scrollTo.toggleClass("highlight");
	$('#watch-face').animate({scrollTop: scrollNum});
  },

  scrollDown: function() {
	  this.clearToggle();
    //$('#watch-face').animate({scrollTop: '+=70px'});
	if (this.taskIds.length <= 0)
	  {
		  //console.log("scroll error zero tasks");
		return;
	  }
	  this.current_item = this.current_item+1;
	if (this.current_item >= this.taskIds.length)
	{
		this.current_item = 0;
	}
	//console.log("a " + this.taskIds[this.current_item].get('id'));
	IncompleteTasksScreen.currentTaskId = this.taskIds[this.current_item].get('id');
	var container = $('#incompleteTasks');
	//console.log("removing" + $("#p" + this.taskIds[this.current_item].get('taskNum')));
	var scrollTo = $("#p" + this.taskIds[this.current_item].get('taskNum'));
	var scrollNum = scrollTo.offset().top - container.offset().top + container.scrollTop() - scrollTo.innerHeight()/2;
	scrollTo.toggleClass("highlight");
	$('#watch-face').animate({scrollTop: scrollNum});
  },
  
  clearToggle: function()
  {
	for (var i = 0; i < this.taskIds.length; i=i+1)
	{
		$("#p" + this.taskIds[i].get('taskNum')).toggleClass("highlight", false);
	}
  },

  destroyFirebase: function()
  {
	  var toDelete = [];
	this.incompletetasksCollection.each(function(task)
	{
		toDelete.push(task);
	});
	for (var i = 0; i < toDelete.length; i=i+1)
	{
		this.incompletetasksCollection.remove(toDelete[i]);
	}
  },
  
  render: function() {
    var IncompleteTasksHTML = document.createDocumentFragment();
	
	this.taskIds = [];
	if (this.current_item === undefined)
	{
		this.current_item = -1;
	}

    this.incompletetasksCollection.each(function(task) {
      $(IncompleteTasksHTML).append(this.createIncompleteTaskHTML(task));
	  this.taskIds.push(task);
    }, this);

    this.$el.html(this.template());
    this.$el.append(IncompleteTasksHTML);
	if (this.current_item >= this.taskIds.length)
	{
		if (Number(this.taskIds.length) === 0)
		{
			this.current_item = -1;
		}
		else
		{
			this.current_item = 0;
		}
	}
	// if (Number(this.current_item) !== -1)
	// {
	  // var container = $('#incompleteTasks');
	  // var scrollTo = $("#p" + this.taskIds[this.current_item].get('taskNum'));
	  // var scrollNum = scrollTo.offset().top - container.offset().top + container.scrollTop() - scrollTo.innerHeight()/2;
	  // console.log("scrolling down " + scrollNum + " " + scrollTo.attr("id"));
		// $('#watch-face').animate({scrollTop: scrollNum});
	// }
    return this;
  },

  createIncompleteTaskHTML: function(task) {
      var view = new IncompleteTaskView({
        model: task
      });
      return view.render().el;
    }

});

module.exports = IncompleteTasksScreen;
