//User control
(function(User) {

	User.Model = Backbone.Model.extend({
		defaults: {
			admin: false,
			logged: false
		},

		isSignedIn: function() {
			return !this.isNew(); //works ?
		},

		logIn: function(email, password, onFail, onSucceed) {
			$.ajax({
				url 	 : 'ajax/log-in.php',
				method 	 : 'POST',
				dataType : 'json',
				data 	 : {email : email, password : password },
				error 	 : onFail,
				success  : onSucceed,
				context  : this
			});
			return this;
		}
	}),

	User.List = Backbone.Collection.extend({
		model: User.model
	})
})(Nax.module("User"));