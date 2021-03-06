define([
	'jquery',
	'underscore',
	'backbone',
	'globals',
	'events',
	'collections/ChatRoomCollection',
	'text!templates/ChatRoomListRowTemplate.html'
], function($, _, Backbone, Globals, Vents, ChatRoomCollection, ChatRoomListRowTemplate){

	var ChatRoomListView = Backbone.View.extend({
		className: 'chat-room-details-container',
		rowTemplate: _.template(ChatRoomListRowTemplate),

		events: {
			'click .-js-chat-room': 'renderChatDetails'
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
						that.$el.append(that.rowTemplate(model.toJSON()));
					});

					that.parent_el.html(that.$el);
				},
				error: function(response) {
					console.log('Error');
				}
			});
		},

		renderChatDetails: function(event) {
			this.$el.find('.chat-room').removeClass('active');
			$(event.target).addClass('active');
			this.eventDispatcher.trigger('room:clicked', {roomId: $(event.target).attr('data-attr')});
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return ChatRoomListView;
});