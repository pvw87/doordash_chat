define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var ChatMessageModel = Backbone.Model.extend({
        url : function(){
			return '/api/rooms' + this.urlParams + '/messages';
		},

		initialize: function(options) {
			this.urlParams = '';

			var roomId = options.roomId;
			if (roomId) {
				this.urlParams += '/' + roomId;
			}
		}
    });

    return ChatMessageModel;
});