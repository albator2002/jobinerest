// Module dependencies.

    var express = require( 'express' ),     //Web framework
    bodyParser = require('body-parser'),
    path = require( 'path' ),           //Utilities for dealing with file paths    
    methodOverride = require('method-override'),
    mongoose = require( 'mongoose' ); //Used for accessing a MongoDB database
   
//Create server
var app = express();


    // Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//checks request.body for HTTP method overrides
app.use( methodOverride() );


//Connect to database
mongoose.connect( 'mongodb://localhost/jobine', function(err) {
    if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(chalk.red(err));
    }
});

//Request handler module
require('./profileRouter')(app);
require('./jobRouter')(app);
//require('./searchLayoutRouter')(app);

//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});