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
var crypto = require('crypto');

var profileModel = model.loadProfileModel(); //mongoose.model('searchRequest');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, UserToken");
  next();
});

app.post( '/api/login',cors(), function( request, response ) {
    return profileModel.findOne( { 'data.email': request.body.username } , function( err, profileDTO ) {
        if (!err) {
            if(profileDTO && (profileDTO.data.password === request.body.password)) {
                var buffer=[];
                crypto.randomBytes(48, function(err, buffer) {
                    profileDTO.data.token = buffer.toString('hex');
                    profileDTO.save( function( err ) {
                        if( !err ) {
                            console.log( 'token saved' );
                            return response.send(profileDTO);
                        } else {
                            console.log( err );

                        }
                    });
                });
                
            }
            else
            {
                console.log("wrong username or password");
                return response.send('wrong username or password');
            }
        } else {
            console.log(err);
            return response.send('ERROR');
        }
    });
});

//Get a list of all profiles
app.get( '/api/profiles', function( request, response ) {
    return profileModel.find(function( err, requests ) {
        if( !err ) {
            return response.send( requests );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
//Insert a new profile
app.post( '/api/profiles',cors(), function( request, response ) {
    
    var profileDTO = new profileModel({
        data: request.body.data
    });
    var buffer=[];
    crypto.randomBytes(48, function(err, buffer) {
        profileDTO.data.token = buffer.toString('hex');
        profileDTO.save( function( err ) {
            if( !err ) {
                console.log( 'profile inserted' );
                return response.send( profileDTO );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    });
});
//Get a single profile by id
app.get( '/api/profile/:id', function( request, response ) {
    return profileModel.findById( request.params.id, function( err, profileDTO ) {
        if( !err ) {
            return response.send( profileDTO );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
//Update a profile
app.put( '/api/profiles/:id', function( request, response ) {
    return profileModel.findById( request.params.id, function( err, profileDTO ) {

        profileDTO.data = request.body.data;
        return profileDTO.save( function( err ) {
            if( !err ) {
                console.log( 'profile updated' );
                return response.send( profileDTO );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    });
});
//Delete a profile
app.delete( '/api/profiles/:id', function( request, response ) {
    profileModel.findById( request.params.id, function( err, profileDTO ) {
        return profileDTO.remove( function( err ) {
            if( !err ) {
                console.log( 'profile removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    });
});


};
