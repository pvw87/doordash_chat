define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"collections/ChatRoomMessagesCollection",
	"models/ChatMessageModel",
	"text!templates/ChatRoomMessagesListViewTemplate.html",
	"text!templates/ChatRoomMessagesRowViewTemplate.html"
], function($, _, Backbone, Globals, ChatRoomMessagesCollection, ChatMessageModel, ChatRoomMessagesListViewTemplate, ChatRoomMessagesRowViewTemplate){

	var MatchesView = Backbone.View.extend({
		className: 'chat-room-messages-list',
		template:  _.template(ChatRoomMessagesListViewTemplate),
		chatRowTemplate: _.template(ChatRoomMessagesRowViewTemplate),

		events: {
        	"keyup input": "enableSendButton",
            "click .-js-send-message": "sendMessage"
        },

		initialize: function(options) {
			var view = this;
			this.parent_el = options.parent_el;
			this.roomId = options.roomId;
			this.chatRoomMessages = new ChatRoomMessagesCollection({
				id: this.roomId
			});

			this.$el.html(this.template());
		},

		render: function(collection){
			var view = this;
			
			this.chatRoomMessages.fetch({
				success: function(collection, response, options) {
					collection.each(function(model) {
						view.$el.find('.-js-messages-list').append(view.chatRowTemplate({message: model.toJSON()}));
					})
					view.parent_el.html(view.$el);
				},
				error: function(response) {
					console.log("Error");
				}
			});
		},

		enableSendButton: function(event) {
            if (!this.$el.find("input").val().length) {
                this.$el.find(".-js-send-message").addClass("disabled");
            } else {
                this.$el.find(".-js-send-message").removeClass("disabled");
            }
        },

        sendMessage: function() {
        	var view = this;

        	if (!this.$el.find(".-js-send-message").hasClass("disabled")) {
        		var model = new ChatMessageModel({
                	message: this.$el.find("input").val(),
                	name: Globals["loggedInUser"].userName,
                	roomId: this.roomId
                });
                model.save().done(function() {
                	view.chatRoomMessages.add(model);
                	view.$el.find('.-js-messages-list').append(view.chatRowTemplate({message: model.toJSON()}));
                	view.$el.find("input").val('');
                	view.enableSendButton();
                });
                
            }
        },

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});