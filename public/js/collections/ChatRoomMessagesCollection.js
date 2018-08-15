define(['jquery','backbone','models/ChatMessageModel'],

  function($, Backbone, ChatMessageModel) {
    var Collection = Backbone.Collection.extend({
      model: ChatMessageModel,
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
    return Collection;
  }

);