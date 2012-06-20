var chat = {

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