(function(Message) {

	Message.Model = Backbone.Model.extend({
		defaults: {
			undread: true
		}
	});

	Message.List = Backbone.Collection.extend({
		model: Message.Model
	});

})(Chat.module("message"));