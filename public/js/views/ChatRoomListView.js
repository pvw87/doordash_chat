define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"events",
	"collections/ChatRoomCollection",
	"text!templates/RoomListViewTemplate.html"
], function($, _, Backbone, Globals, Vents, ChatRoomCollection, RoomListViewTemplate){

	var MatchesView = Backbone.View.extend({
		template:  _.template(RoomListViewTemplate),

		events: {
			"click .-js-chat-room": "renderChatDetails"
		},

		initialize: function(options) {
			var that = this;
			this.parent_el = options.parent_el;
			this.eventDispatcher = Vents;
			this.$el.html(this.template);

			this.chatRooms = new ChatRoomCollection();
		},

		render: function(collection){
			var that = this;
			
			this.chatRooms.fetch({
				success: function(collection, response, options){
					collection.each(function(model) {
						that.$el.find('.chat-room-details-container').append("<div class='-js-chat-room' data-attr='" + model.get("id") + "'>" + model.get("name") + "</div>");
					});

					that.parent_el.html(that.$el);
				},
				error: function(response) {
					console.log("Error");
				}
			});
		},

		renderChatDetails: function(event) {
			this.eventDispatcher.trigger("room:clicked", {roomId: $(event.target).attr('data-attr')});
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});