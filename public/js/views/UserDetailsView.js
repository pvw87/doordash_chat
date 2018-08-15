define([
    'jquery',
    'underscore',
    'backbone',
    'globals',
    'text!templates/UserDetailsViewTemplate.html'
], function($, _, Backbone, Globals, UserDetailsViewTemplate){

    var LoginView = Backbone.View.extend({
        className: 'user-details',
        template:  _.template(UserDetailsViewTemplate),

        initialize: function(options) {
            this.parent_el = options.parent_el
        },

        render: function() {
            this.$el.html(this.template(Globals));
            this.updateOnlineTime();
            this.parent_el.html(this.$el);
        },

        updateOnlineTime: function() {
            var view = this;

            var loggedInTime = Globals['loggedInUser'].loggedInTime;
            view.interval = setInterval(function() {
                var currentTime = Date.now();
                var onlineTime = Math.ceil((currentTime - loggedInTime) / 60000);
                view.$el.find('.-js-online-time').html(onlineTime);
            }, 60000);

        },

        close : function(){
            clearInterval(this.interval);
            this.undelegateEvents();
            this.remove();
        }
    });

    return LoginView;
});