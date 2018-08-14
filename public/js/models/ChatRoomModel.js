define([
    "jquery",
    "underscore",
    "backbone"
], function($, _, Backbone){

    var ChatRoomModel = Backbone.Model.extend({
        url : function(){
			return 'http://localhost:8080/api/rooms' + this.urlParams;
		},

		initialize: function(options) {
			this.urlParams = "";

			var roomId = options.id;
			if (roomId) {
				this.urlParams += "/" + roomId;
			}
		}
    });
    return ChatRoomModel;
});