define([
    "jquery",
    "underscore",
    "backbone"
], function($, _, Backbone){

    var ChatRoomModel = Backbone.Model.extend({
        urlRoot: "/api/rooms",
    });
    return ChatRoomModel;
});