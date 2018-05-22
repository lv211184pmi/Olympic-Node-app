const Event = require('../models/event');

module.exports = {
    showEvents: (req, res) => {
        const events = [
            {name: 'Basketball', slug: 'basketball', description: 'Throwing into basket'},
            {name: 'Swimming', slug: 'swimming', description: 'Swim in a pul'},
            {name: 'Weightlifting', slug: 'weightlifting', description: 'Lifting heavy things'}
        ];

        res.render('pages/events', { events: events });
    },

    showSingle: (req, res) => {
        const event = {name: 'Basketball', slug: 'basketball', description: 'Throwing into basket'};
         res.render('pages/single', { event: event });
    }
};