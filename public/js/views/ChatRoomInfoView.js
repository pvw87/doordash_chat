define([
	'jquery',
	'underscore',
	'backbone',
	'globals',
	'events',
	'models/ChatRoomModel',
	'text!templates/ChatRoomInfoViewTemplate.html'
], function($, _, Backbone, Globals, Vents, ChatRoomModel, ChatRoomInfoViewTemplate){

	var MatchesView = Backbone.View.extend({

		template:  _.template(ChatRoomInfoViewTemplate),

		initialize: function(options) {
			var that = this;
			this.parent_el = options.parent_el;
			this.eventDispatcher = Vents;
			this.chatRoomModel = new ChatRoomModel({
				roomId: options.roomId
			});

			this.listenTo(this.eventDispatcher, 'roomInfo:update', this.updateUserList);
		},

		render: function(collection){
			var that = this;
			
			this.chatRoomModel.fetch({
				success: function(model, response, options){
					var loggedInUser = Globals["loggedInUser"].userName;
					var users = response.users;
					var index = users.indexOf(loggedInUser);
					users.splice(index, 1);					
					response.users = users.join(', ');

					that.$el.html(that.template({
						roomDetails: response, 
						loggedInUser: Globals["loggedInUser"].userName
					}));
					that.parent_el.html(that.$el);
				},
				error: function(response) {
					console.log('Error');
				}
			});
		},

		updateUserList: function() {
			if (!(_.has(this.chatRoomModel.get("users"), Globals["loggedInUser"].userName))) {
				this.render();
			}
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});