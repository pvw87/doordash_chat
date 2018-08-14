define([
    "jquery",
    "backbone",
    "globals",
    "views/LoginView",
    "views/ChatDashboardView"
], function($, Backbone, Globals, LoginView, ChatDashboardView) {

        var Router = Backbone.Router.extend({

            initialize: function() {
                Backbone.history.start();
            },

            routes: {
                "dashboard": "renderChatDashboard",
                "": "renderLoginView"
            },

            cleanup_views : function(){
                if (this.previousView){
                    this.previousView.close();
                    this.previousView = null;
                }
            },

            renderLoginView: function() {
                var loginView = new LoginView();
                loginView.render();
                this.cleanup_views();
                this.previousView = loginView;
            },

            renderChatDashboard: function() {
                if (!_.has(Globals, "loggedInUser")) {
                    Backbone.history.navigate("", true);
                } else {
                    var chatDashboardView = new ChatDashboardView();
                    chatDashboardView.render();
                    this.cleanup_views();
                    this.previousView = chatDashboardView;
                }
            }

        });
        return Router;
    }

);