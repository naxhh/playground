//Example namespace
var Chat = {
	//Load a module
	module: function() {
		//cached modules
		var modules = {};
		
		//Return the existing module
		return function(name) {
			if (modules[name]) {
				return modules[name]
			}
			
			//IF is not cached, we create it
			return modules[name] = { Views: {} };
		}
	}

}


//Templates
var Templates = {
	fetch: function(callback) {
		var self = this;

		$.get('ajax/templates.php', function(templates) {
			console.log(templates);
			var templates = $.toJSON(templates);
			_.each([templates], function(template) {
				self[template.path] = template.contents;
				console.log(template);
			});

			if (_.isFunction(callback)) callback();
		});
	}
}

//init app
$(document).ready(function() {
	console.log('ready!');
});