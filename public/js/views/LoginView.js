define([
    'jquery',
    'underscore',
    'backbone',
    'globals',
    'text!templates/LoginViewTemplate.html'
], function($, _, Backbone, Globals, LoginViewTemplate){

    var LoginView = Backbone.View.extend({
        render_el: $('#app'),
        className: 'login-view-container',
        template:  _.template(LoginViewTemplate),

        events: {
            'keyup input': 'enableSubmitButton',
            'click .-js-submit-user-name': 'loginSuccess'
        },

        render: function() {
            this.$el.html(this.template());
            this.render_el.html(this.$el);
        },

        enableSubmitButton: function(event) {
            if (!$(event.target).val().length) {
                this.$el.find('.-js-submit-user-name').addClass('disabled');
            } else {
                this.$el.find('.-js-submit-user-name').removeClass('disabled');
                if (event.keyCode == 13){
                    this.loginSuccess();
                }
            }
        },

        loginSuccess: function(event) {
            if (!this.$el.find('.-js-submit-user-name').hasClass('disabled')) {
                Globals['loggedInUser'] = {
                    userName: this.$el.find('input').val(),
                    loggedInTime: Date.now()
                }

                Backbone.history.navigate('dashboard', true);
            }
        },

        close : function(){
            this.undelegateEvents();
            this.remove();
        }
    });

    return LoginView;
});