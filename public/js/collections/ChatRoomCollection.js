define(['jquery','backbone','models/ChatRoomModel'],

  function($, Backbone, ChatRoomModel) {
    var Collection = Backbone.Collection.extend({
      model: ChatRoomModel,
      url: function() {
			return '/api/rooms';
		}

    });
    return Collection;
  }

);