'use strict';

var notificationsConfig = [
    {
      name: 'Done task notification',
      buttonEvents: {
        right: 'doneTask',
        left: 'cancel',
        top: 'cancel',
        down: 'cancel'
      },
      doneTask: function()
      {
        // console.log("something!");
        global.App.router.currentView.stopListening();
        global.App.router.currentView.listenTo(global.App.router.currentView.incompletetasksCollection, 'all',  global.App.router.currentView.render);
        global.App.router.currentView.removeTask();
        global.App.router.currentView.setButtonEvents();
      },

      cancel: function()
      {
        // console.log(global.App.router.currentView.id);
        global.App.router.currentView.stopListening();
        global.App.router.currentView.listenTo(global.App.router.currentView.incompletetasksCollection, 'all',  global.App.router.currentView.render);
        global.App.router.currentView.setButtonEvents();
      }
    },
    {
      name: 'Go to contacts on right button',
      defaultMessage: 'Click right button to go to contacts.',
      buttonEvents: {
        right: 'navigateToContacts'
      },
      navigateToContacts: function() {
        global.App.navigate('contacts');
      }
    },
    {
      name: 'Left button will be contacts now',
      defaultMessage: 'Now right button will lead you to contacts.',
      buttonEvents: {
        right: 'navigateToContacts'
      },
      navigateToContacts: function() {
        global.App.navigate('contacts');
      }
    },
    {
      name: 'Contacts on the right!',
      buttonEvents: {
        right: 'navigateToContacts'
      },
      navigateToContacts: function() {
        global.App.navigate('contacts');
      }
    }
];

module.exports = notificationsConfig;
