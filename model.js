/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var mongooseGen = require('./mongooseGen');

exports.loadSaveRequestModel = function(){

return mongooseGen.loadSchema('searchRequest');//mongoose.model('searchRequest', searchRequestSchema );

};
exports.loadSearchLayoutModel = function(){

return mongooseGen.loadSchema('searchLayout');  //, searchConfigSchema );

};

exports.loadProfileModel = function(){

return mongooseGen.loadSchema('profileDTO');  //, searchConfigSchema );

};
exports.loadJobModel = function(){

    return mongooseGen.loadSchema('jobDTO');  //, searchConfigSchema );

};
