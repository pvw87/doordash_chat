define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"collections/ChatRoomMessagesCollection",
	"text!templates/ChatRoomMessagesListViewTemplate.html"
], function($, _, Backbone, Globals, ChatRoomMessagesCollection, ChatRoomMessagesListViewTemplate){

	var MatchesView = Backbone.View.extend({

		template:  _.template(ChatRoomMessagesListViewTemplate),

		initialize: function(options) {
			var that = this;
			this.parent_el = options.parent_el;
			this.chatRoomMessages = new ChatRoomMessagesCollection({
				id: options.roomId
			});
		},

		render: function(collection){
			var that = this;
			
			this.chatRoomMessages.fetch({
				success: function(collection, response, options){
					that.$el.html(that.template({messages: response}))
					that.parent_el.html(that.$el);
				},
				error: function(response) {
					console.log("Error");
				}
			});
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});