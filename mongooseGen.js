/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var fs = require('fs');

var mongoose = require('mongoose');
var generator = require('mongoose-gen');

exports.loadSchema = function(schemaName){
// load json

var data = fs.readFileSync('./'+schemaName +'.json', {encoding: 'utf8'});
var jsonData = JSON.parse(data);

// In the above _book.json_ file there is a `validateBookYear` token.
// mongoose-gen uses this token to lookup an actual validator function which
// should be registered beforehand. This is how to register validators.
generator.setDefault('setDefaultDate', function () {
    return Date.now();
});
generator.setDefault('setDefaultMock', function () {
    return "fjjfhgh";
});
generator.setDefault('setDefaultMockNum', function () {
    return 45.595208;
});

    
// Generate the Schema object.
var schema = new mongoose.Schema(generator.convert(jsonData));

// Connect to mongodb and bind the book model.
//mongoose.connect('mongodb://localhost:27017/search_test');
var model = mongoose.model(schemaName, schema);
return model;
};