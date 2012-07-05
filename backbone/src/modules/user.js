//User control
(function(User) {

	User.Model = Backbone.Model.extend({
		defaults: {
			admin: false,
			logged: false
		},

		isSignedIn: function() {
			return this.attributes.logged;
		},

		logIn: function(email, password, onFail, onSucceed) {
			var self = this;

			var data = {email : email, password : password };
			var error = function() {
				$.gritter.add({ title:"Ups!", text:"Se ha producido un error!"});
				return self;
			};
			var success = function() {
				$.gritter.add({ title:"Welcome!", text:"Bienvenido!"});
				router.navigate("/index", true);
			};

			Nax.Ajax.get("log-in.php", data, success, error);
		}
	});

	User.List = Backbone.Collection.extend({
		model: User.model
	});

	//Views
	User.View = {};

	User.View.Login = Backbone.View.extend({
		el: $("#content"),
		events : {
			"click input[type='submit']": "login",
		},
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.empty();
			this.$el.append( Nax.Template["/login"]() );
		},
		login : function() {
			this.model.logIn("a", "b"); //test
		}
	});
})(Nax.module("User"));