var express = require('express');
var _ = require('lodash');
var moment = require('moment');

var R = express.Router();

R.get('/info', function(req, res) {
	res.json({
		api: {
			version: '1.0',
			language: 'en',
			date: moment().format('MMMM Do YYYY, h:mm')
		}
	});
});

module.exports = R;