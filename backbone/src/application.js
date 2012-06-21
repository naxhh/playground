//App namespace
window.Nax = {

	//Load all the templates and save it in Templates.
	//Call them as Templates["/index"]({Data});
	Template:{
		fetch: function(callback) {
			var self = this;

			$.get('ajax/templates.php', function(templates) {

				var templates = $.parseJSON(templates);

				_.each(templates, function(template) {
					self[template.path] = _.template(template.contents);
				});

				if (_.isFunction(callback)) callback();
			});
		}
	},

	//Load a module and append it to the namespace
	module: function(name) {
		//cached modules
		var modules = {};

		if (modules[name]) {
			this[name] = modules[name];
			return modules[name]
		}

		//if not exists we create it
		modules[name] = { Views: {} };
		this[name] = modules[name];
		return modules[name];
	}
};

var router, me;

//init app
$(document).ready(function() {

	 router = new NaxRouter(); //router init
	 Backbone.history.start();

	//Templates
	Nax.Template.fetch(function() {

		//Default user
		me = new Nax.User.Model;

		//si ya estoy logueado cargo el dashboard
		if (me.isSignedIn()) {
			
		//sino, cargo el login
		} else {
			router.navigate("/login", true);

		}

	});
});