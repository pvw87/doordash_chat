define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"collections/ChatRoomCollection",
	"text!templates/RoomListViewTemplate.html"
], function($, _, Backbone, Globals, ChatRoomCollection, RoomListViewTemplate){

	var MatchesView = Backbone.View.extend({
		el: ".chat-room-details",
		template:  _.template(RoomListViewTemplate),

		initialize: function(options) {
			var that = this;
			this.$el.html(this.template);

			this.chatRooms = new ChatRoomCollection();
		},

		render: function(collection){
			var that = this;
			
			this.chatRooms.fetch({
				success: function(collection, response, options){
					collection.each(function(model) {
						that.$el.find('.chat-room-details-container').append(model.get("name"));
					})
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