const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    eventController = require('./controllers/events.controller');

module.exports = router;

router.get('/', mainController.showHome);
router.get('/events',       eventController.showEvents);
router.get('/events/:slug', eventController.showSingle);