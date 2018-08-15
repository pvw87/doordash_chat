define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"events",
	"collections/ChatRoomCollection"
], function($, _, Backbone, Globals, Vents, ChatRoomCollection){

	var ChatRoomListView = Backbone.View.extend({
		className: "chat-room-details-container",

		events: {
			"click .-js-chat-room": "renderChatDetails"
		},

		initialize: function(options) {
			var that = this;
			this.parent_el = options.parent_el;
			this.eventDispatcher = Vents;

			this.chatRooms = new ChatRoomCollection();
		},

		render: function(collection){
			var that = this;
			
			this.chatRooms.fetch({
				success: function(collection, response, options){
					collection.each(function(model) {
						that.$el.append("<div class='chat-room -js-chat-room' data-attr='" + model.get("id") + "'>" + model.get("name") + "</div>");
					});

					that.parent_el.html(that.$el);
				},
				error: function(response) {
					console.log("Error");
				}
			});
		},

		renderChatDetails: function(event) {
			this.$el.find('.chat-room').removeClass("active");
			$(event.target).addClass("active");
			this.eventDispatcher.trigger("room:clicked", {roomId: $(event.target).attr('data-attr')});
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return ChatRoomListView;
});