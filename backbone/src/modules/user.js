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
			$.ajax({
				url 	 : 'ajax/log-in.php',
				method 	 : 'POST',
				dataType : 'json',
				data 	 : {email : email, password : password },
				error 	 : function() { $.gritter.add({ title:"Ups!", text:"Se ha producido un error!"}); },
				success  : function() { $.gritter.add({ title:"Welcome!", text:"Bienvenido!"}); router.navigate("/index", true); },
				context  : this
			});
			return this;
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
			this.model.logIn("a", "b");
		}
	});
})(Nax.module("User"));