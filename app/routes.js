const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    eventController = require('./controllers/events.controller');

module.exports = router;

//main route
router.get('/', mainController.showHome);

//events route
router.get('/events', eventController.showEvents);

//seed events
router.get('/events/seed', eventController.seedEvents);

//create events
router.get('/events/create', eventController.showCreate);
router.post('/events/create', eventController.processCreate);

//update events
router.get('/events/:slug/edit', eventController.showEdit);
router.post('/events/:slug', eventController.processEdit);

//delete an event
router.get('/events/:slug/delete', eventController.deleteEvent);

//show a single event
router.get('/events/:slug', eventController.showSingle);