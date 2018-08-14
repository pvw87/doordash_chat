define(["jquery", "backbone", "models/Model", "views/View", "collections/Collection"],

    function($, Backbone, Model, View, Collection) {

        var Router = Backbone.Router.extend({

            initialize: function() {
                Backbone.history.start();
            },

            routes: {
                "": "index"
            },

            index: function() {
                new View();
            }

        });
        return Router;
    }

);