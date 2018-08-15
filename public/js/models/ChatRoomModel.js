define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var ChatRoomModel = Backbone.Model.extend({
        url : function(){
			return '/api/rooms' + this.urlParams;
		},

		initialize: function(options) {
			this.urlParams = '';

			var roomId = options.roomId;
			if (roomId) {
				this.urlParams += '/' + roomId;
			}
		}
    });
    return ChatRoomModel;
});