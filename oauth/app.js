var express = require('express');
var app = express.createServer();
var OAuth = require('oauth').OAuth;

//express config
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: "thatisnaxsecretstring"}));


//oauth config
var oa = new OAuth (
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token",
	"Consumer Token", //consumer
	"Secret Token", //secret
	"1.0",
	"http://localhost:88/auth/twitter/callback",
	"HMAC-SHA1"

);

//user check middleware
function checkForUser(req, res, next) {
	if (typeof req.session.user == 'undefined') {
		req.session.user = {};
		req.isLogged = false;
		next();
	} else {
		req.isLogged = true;
		next();
	}
}


app.get("/", checkForUser, function (req, res) {
	if (req.isLogged) {
		res.send("You are logged as "+req.session.user.twitter["screen_name"]);
	} else {
		res.send("<a href='/auth/twitter/'>Login with twitter</a>");
	}
});


//Make twitter auth
app.get('/auth/twitter', function(req, res) {
	oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, result) {
		if (error) {
			console.log(error);
			res.send("not working :(");
		} else {
			req.session.oauth = {};
			req.session.oauth.token = oauth_token;
			req.session.oauth.token_secret = oauth_token_secret;

			res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
		}

	});
});

//callback twitter auth
app.get('/auth/twitter/callback', function(req, res, next) {
	if (req.session.oauth) {
		req.session.oauth.verifier = req.query.oauth_verifier;
		var oauth = req.session.oauth;

		oa.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier,
		function (error, oauth_access_token, oauth_acces_token_secret, results) {
			if (error) {
				console.log(error);
				res.sen("second error");
			} else {
				req.session.oauth.access_token = oauth_access_token;
				req.session.oauth, access_token_secret = oauth_acces_token_secret;
				req.session.user.twitter = results;
				console.log(results);
				res.send("Hello "+results["screen_name"]+"!");
			}
		});
	}
});

app.listen(88);