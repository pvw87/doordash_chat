define(["jquery", "backbone", "models/Model", "text!templates/heading.html"],

    function($, Backbone, Model, template){

        var View = Backbone.View.extend({

            el: ".app",

            initialize: function() {
                this.render();
            },

            events: {

            },
            
            render: function() {
                this.template = _.template(template, {});

                this.$el.html(this.template);

                return this;
            }

        });
        return View;

    }

);