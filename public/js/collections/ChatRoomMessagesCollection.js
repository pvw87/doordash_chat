define(["jquery","backbone","models/ChatRoomModel"],

  function($, Backbone, ChatRoomModel) {
    var Collection = Backbone.Collection.extend({
      model: ChatRoomModel,
		url : function(){
			return 'http://localhost:8080/api/rooms' + this.urlParams + "/messages";
		},

		initialize: function(options) {
			this.urlParams = "";

			var roomId = options.id;
			if (roomId) {
				this.urlParams += "/" + roomId;
			}
		},

    });
    return Collection;
  }

);