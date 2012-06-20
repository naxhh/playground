(function(Friend) {

	//Dependencies
	var Message = chat.module("message");

	//Shorthands
	var app = chat.app;

	//Define a friend
	Friend.Model = Backbone.Model.extend({
		initialize: function() {
			//add the message collection
			this.set({messages: new Message.List() });
		}
	})

	//Define a friend list
	Friend.List = Backbone.Collection.extend({
		model: Friend.Model
	});

})(chat.module("friend"));