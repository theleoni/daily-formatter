
'use strict';

var fs = require('fs');
var path = require('path');
var xmlReader = require('read-xml');
var xmlParser = require('fast-xml-parser');
var he = require('he');
// var logger = require('morgan');

var index = require(__dirname + '/dist/index');
var config = require(__dirname + '/dist/config');

var basePath = __dirname + '/xml/';
fs.readdir(basePath, (err, files) => {
  if (err) {
  	return console.log(err);
  }

	files.filter(e => e.endsWith('.xml')).forEach(item => {
		var file = basePath + item;

		xmlReader.readXML(fs.readFileSync(file), function(err, data) {
		  if (err) {
		    return console.error('Não foi possível ler os arquivos.');
		  }

			var tObj = xmlParser.getTraversalObj(data.content, config.XMP_OPTIONS);
			// var jsonObj = xmlParser.convertToJson(tObj, config.XMP_OPTIONS);
			var jsonObj = JSON.parse( JSON.stringify( xmlParser.convertToJson(tObj, config.XMP_OPTIONS) ) );

			// console.log(index(jsonObj));
			console.log(index.default(jsonObj));
		});
	});

})
