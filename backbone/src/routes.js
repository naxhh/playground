//Routes
NaxRouter = Backbone.Router.extend({

	routes: {
		"home" : "index",
		"index": "index",

		"login": "login"
	},

	index: function() {
		//how to check if the user is not logged in every time without cause bucle= :(
	},

	login: function() {
		new Nax.User.View.Login({ model: me});
	}

});
