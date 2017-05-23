/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Router

module.exports = function(app) {
    
var cors = require('cors');
var mongoose = require('mongoose');
var model = require('./model');

var jobModel = model.loadJobModel();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, UserToken");
  next();
});

//Get filtered job list
    app.get( '[/api/jobs?$filter=]+[\\s\\S]', function( request, response ) {
        return jobModel.find(request.params.$filter,function( err, requests ) {
            if( !err ) {
                return response.send( requests );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    });

//Get a list of all requests
app.get( '/api/jobs', function( request, response ) {
    return jobModel.find(function( err, requests ) {
        if( !err ) {
            return response.send( requests );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});



//Insert a new job
app.post( '/api/jobs',cors(), function( request, response ) {
    var jobDTO = new jobModel();
    jobDTO.data = request.body.data;
    jobDTO.data.location = request.body.data.location;
    jobDTO.save( function( err ) {
        if( !err ) {  
            console.log( 'Job inserted' );
            return response.send( jobDTO );
        } else {  
            console.log( err );
            return response.send('ERROR');
        }
    });
});
//Get a single job by id
app.get( '/api/jobs/:id', function( request, response ) {
    return jobModel.findById( request.params.id, function( err, jobDTO ) {
        if( !err ) {
            return response.send( jobDTO );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
//Update a job
app.put( '/api/jobs/:id', function( request, response ) {
    return jobModel.findById( request.params.id, function( err, jobDTO ) {
      
        jobDTO.data = request.body.data;
       
        return jobDTO.save( function( err ) {
            if( !err ) {
                console.log( 'job updated' );
                return response.send( jobDTO );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    });
});
//Delete a book
app.delete( '/api/jobs/:id', function( request, response ) {
    jobModel.findById( request.params.id, function( err, jobDTO ) {
        return jobDTO.remove( function( err ) {
            if( !err ) {
                console.log( 'job removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    });
});


};
