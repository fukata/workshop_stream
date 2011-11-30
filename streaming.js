var https = require('https'),
	fs = require('fs');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
var host = 'stream.twitter.com';
var username = config.username;
var password = config.password;
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

var userids = (function(fs){
	var text = fs.readFileSync('./twitter_user_ids');
	return text.toString().trim().replace(" ", "").replace(/(\r\n|\r|\n)/g, ",");
})(fs);
console.log("userids: %s", userids);
var options = {
	"host"          : host,
	"port"          : 443,
	"path"          : '/1/statuses/filter.json?follow=' + userids,
	"method"        : 'POST',
	"Authorization" : auth
};
var request = https.request(
	options,
	function(res) {
		res.on('data', function(d) {
			try {
				var t = JSON.parse(d);
				process.stdout.write(new Buffer(t.created_at + ' ' + t.user.screen_name + ': ' + t.text + "\n"));
			} catch (e) {
				//console.log(e);
			}
		 });
	}
);

request["_headers"]["Authorization"]     = auth;
request["_headerNames"]["Authorization"] = 'Authorization';
request.end();
