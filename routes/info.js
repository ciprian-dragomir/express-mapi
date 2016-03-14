var express = require('express'),
	_ = require('lodash'), 
	moment = require('moment'),
	faker = require('faker');

var R = express.Router();

R.get('/info', function(req, res) {
	res.json({
		api: {
			version: '1.0',
			language: 'en',
			date: moment().format('MMMM Do YYYY, h:mm')
		},
		welcome: {
			user: {
				name: faker.name.findName()
			}
		}
	});
});

module.exports = R;