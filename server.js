//grab all dependencies
const express       = require('express'),
    app             = express(),
    port            = process.env.PORT || 8080,
    expressLayouts  = require('express-ejs-layouts'),
    mongoose        = require('mongoose');

//configure application
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(expressLayouts);

//db connection
mongoose.connect('mongodb://lv211184pmi:211184pmi@ds016118.mlab.com:16118/olympics_app');

//set routes
app.use(require('./app/routes'));

//start server
app.listen(port, ()  => {
    console.log(`App is listening on http://localhost:${port}`);
});