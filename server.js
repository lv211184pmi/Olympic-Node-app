//grab all dependencies
const express       = require('express'),
    app             = express(),
    port            = process.env.PORT || 8080,
    expressLayouts  = require('express-ejs-layouts'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    coockieParser   = require('cookie-parser'),
    flash           = require('connect-flash'),
    expressValidator = require('express-validator');

//configure application
//set sessions and cookie parser
app.use(coockieParser());
app.use(session({
    secret: 'my-super-secret',
    coockie: { maxAge: 60000 },
    resave: false, //forces the session to be saved back to the store
    saveUninitialized: false //dont save unmodified
}));
app.use(flash());

//tells express where to look for static assets
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(expressLayouts);

//db connection
mongoose.connect('mongodb://lv211184pmi:211184pmi@ds016118.mlab.com:16118/olympics_app');

//use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

//set routes
app.use(require('./app/routes'));

//start server
app.listen(port, ()  => {
    console.log(`App is listening on http://localhost:${port}`);
});