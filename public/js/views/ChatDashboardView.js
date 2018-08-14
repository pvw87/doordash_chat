define([
    "jquery",
    "underscore",
    "backbone",
    "globals",
    "views/RoomListView",
    "text!templates/ChatDashboardViewTemplate.html"
], function($, _, Backbone, Globals, RoomListView, ChatDashboardViewTemplate){

    var ChatDashboardView = Backbone.View.extend({
        render_el : $("#app"),
        template:  _.template(ChatDashboardViewTemplate),

        render: function() {
            if (!_.has(Globals, "loggedInUser")) {
                Backbone.history.navigate("", true);
            }
            else {
                this.$el.html(this.template(Globals));
                this.render_el.html(this.$el);
                var roomListView = new RoomListView();
                roomListView.render();
            }
        },

        close : function(){
            this.undelegateEvents();
            this.remove();
        }
    });

    return ChatDashboardView;
});