(function(Ajax) {

	Ajax.get = function(url, data, success, error) {
		$.ajax({
			url 	 : 'ajax/'+url,
			method 	 : 'POST',
			dataType : 'json',
			data 	 : data,
			error 	 : error,
			success  : success
		});
		return this;
	}

})(Nax.module("Ajax"))