define(["jquery","backbone","models/ChatMessageModel"],

  function($, Backbone, ChatMessageModel) {
    var Collection = Backbone.Collection.extend({
      model: ChatMessageModel,
		url : function(){
			return 'http://localhost:8080/api/rooms' + this.urlParams + "/messages";
		},

		initialize: function(options) {
			this.urlParams = "";

			var roomId = options.id;
			if (roomId) {
				this.urlParams += "/" + roomId;
			}
		}
    });
    return Collection;
  }

);