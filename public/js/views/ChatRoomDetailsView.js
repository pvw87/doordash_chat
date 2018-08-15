define([
    "jquery",
    "underscore",
    "backbone",
    "globals",
    "events",
    "views/ChatRoomInfoView",
    "views/ChatRoomMessagesListView",
    "text!templates/ChatRoomDetailsViewTemplate.html"
], function($, _, Backbone, Globals, Vents, ChatRoomInfoView, ChatRoomMessagesListView, 
     ChatRoomDetailsViewTemplate){

    var LoginView = Backbone.View.extend({
        className: 'chat-room-details-container',
        template:  _.template(ChatRoomDetailsViewTemplate),

        initialize: function(options) {
        	this.parent_el = options.parent_el;
        	this.eventDispatcher = Vents;

        	this.listenTo(this.eventDispatcher, "room:clicked", this.showChatDetails);
        },

        render: function() {
            this.$el.html(this.template());
            this.parent_el.html(this.$el);
        },

        showChatDetails: function(options) {
        	var selectedRoomId = options.roomId;
        	this.$el.find('.-js-welcome-message').addClass("hidden");
            this.$el.find('.-js-chat-room-container').removeClass("hidden");

        	this.chatRoomInfoView = new ChatRoomInfoView({
        		roomId: selectedRoomId,
            	parent_el: this.$el.find('.-js-chat-room-details')
            });
            this.chatRoomInfoView.render();

			this.chatRoomMessagesListView = new ChatRoomMessagesListView({
				roomId: selectedRoomId,
            	parent_el: this.$el.find('.-js-chat-room-messages-list-container')
            });
			this.chatRoomMessagesListView.render();
        },

        close : function(){
        	this.chatRoomInfoView.close();
        	this.chatRoomMessagesListView.close();

            this.undelegateEvents();
            this.remove();
        }
    });

    return LoginView;
});