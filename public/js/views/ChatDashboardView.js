define([
    "jquery",
    "underscore",
    "backbone",
    "globals",
    "views/UserDetailsView",
    "views/ChatRoomListView",
    "views/ChatRoomDetailsView",
    "text!templates/ChatDashboardViewTemplate.html"
], function($, _, Backbone, Globals, UserDetailsView, ChatRoomListView, ChatRoomDetailsView, ChatDashboardViewTemplate){

    var ChatDashboardView = Backbone.View.extend({
        render_el : $("#app"),
        className: "chat-container",
        template:  _.template(ChatDashboardViewTemplate),

        render: function() {
            this.$el.html(this.template());
            this.render_el.html(this.$el);

            this.userDetailsView = new UserDetailsView({
                parent_el: this.$el.find(".-js-user-details-container")
            });
            this.userDetailsView.render();
            
            this.chatRoomListView = new ChatRoomListView({
                parent_el: this.$el.find(".-js-chat-room-list-view")
            });
            this.chatRoomListView.render();
            
            this.chatRoomDetailsView = new ChatRoomDetailsView({
                parent_el: this.$el.find('.-js-chat-main-body')
            });
            this.chatRoomDetailsView.render();
        },

        close : function(){
            this.userDetailsView.close();
            this.chatRoomListView.close();
            this.chatRoomDetailsView.close();

            this.undelegateEvents();
            this.remove();
        }
    });

    return ChatDashboardView;
});