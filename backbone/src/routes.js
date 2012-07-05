//Routes
NaxRouter = Backbone.Router.extend({

	routes: {
		"home" : "index",
		"index": "index",

		"login": "login"
	},

	index: function() {
		this.checkLogin();
		//how to check if the user is not logged in every time without cause bucle :(
		$("#content").empty().text("'Logged'");
		console.log(123);
	},

	login: function() {
		new Nax.User.View.Login({ model: me});
	},

	checkLogin: function() {
		console.log(Nax.Ajax);
	}

});
