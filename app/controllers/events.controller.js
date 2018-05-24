const Event = require('../models/event');

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,
    showCreate: showCreate,
    processCreate: processCreate,
    showEdit: showEdit,
    processEdit: processEdit,
    deleteEvent: deleteEvent
}

function showEvents (req, res) {
    //get all events
    Event.find({}, (err, events) => {
        if (err) {
            res.status(404);
            res.send("Events not found!");
        }
        res.render('pages/events', { 
            events: events,
            success: req.flash('success')
         });
    });
}

function showSingle (req, res) {
    //get a single event
    Event.findOne({ slug: req.params.slug }, (err, event) => {
        if (err) {
            res.status(404);
            res.send("Event not found!");
        }
        res.render('pages/single', { 
            event: event,
            success: req.flash('success')
         });
    });
}

function seedEvents (req, res) {
    //creates an events
    const events = [
        {name: 'Basketball', description: 'Throwing into basket'},
        {name: 'Swimming', description: 'Swim in a pul'},
        {name: 'Weightlifting', description: 'Lifting heavy things'},
        {name: 'Volleyball', description: 'Playing well in team'}
    ];

    Event.remove({}, () => {
        for (event of events) {
            var newEvent = new Event(event);
            newEvent.save();
        }
    });
    
    res.send('Database seeded!');
}

function showCreate (req, res) {
    res.render('pages/create', {
        errors: req.flash('errors')
    });
}

function processCreate (req, res) {
    //validate information
    req.checkBody('name', 'Name is required.').notEmpty();
    req.checkBody('description', 'Description is required.').notEmpty();

    //working with errors if they happened
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect('/events/create');
    }

    //create a new event
    const event = new Event({
        name: req.body.name,
        description: req.body.description
    });

    //save event
    event.save((err) => {
        if(err)
            throw err;

        req.flash('success', 'Successfully created event!');

        res.redirect(`/events/${event.slug}`);
    })
}

//show edit form
function showEdit (req, res) {
    Event.findOne({ slug: req.params.slug }, (err, event) => {
        res.render('pages/edit', {
            event: event,
            errors: req.flash('errors')
        });
    });
}

//edit form
function processEdit (req, res) {
    req.checkBody('name', 'Name is required.').notEmpty();
    req.checkBody('description', 'Description is required.').notEmpty();

    //working with errors if they happened
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect(`/events/${req.params.slug}/edit`);
    }

    //find event
    Event.findOne({ slug: req.params.slug }, (err, event) => {
        //updating event
        event.name = req.body.name;
        event.description = req.body.description;

        event.save((er) => {
            if(err)
                throw err;

            req.flash('success', `Event ${event.name} was successfully updated.`);
            res.redirect('/events');
        });
    });
}

//delete an event
function deleteEvent (req, res) {
    Event.remove({ slug: req.params.slug }, (err) => {
        req.flash('success', 'Event was deleted!');
        res.redirect('/events');
    });
}