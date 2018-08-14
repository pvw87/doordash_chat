define([
    "jquery",
    "backbone",
    "views/LoginView",
    "views/ChatDashboardView"
], function($, Backbone, LoginView, ChatDashboardView) {

        var Router = Backbone.Router.extend({

            initialize: function() {
                Backbone.history.start();
            },

            routes: {
                "dashboard": "renderChatDashboard",
                "*actions": "renderLoginView"
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
                var chatDashboardView = new ChatDashboardView();
                chatDashboardView.render();
                this.cleanup_views();
                this.previousView = chatDashboardView;
            }

        });
        return Router;
    }

);