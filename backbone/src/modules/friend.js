(function(Friend) {

	//Dependencies
	var Message = Chat.module("message");

	//Shorthands
	var app = Chat.app;

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

})(Chat.module("friend"));