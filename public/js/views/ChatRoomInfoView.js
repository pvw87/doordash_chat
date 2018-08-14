define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"models/ChatRoomModel",
	"text!templates/ChatRoomInfoViewTemplate.html"
], function($, _, Backbone, Globals, ChatRoomModel, ChatRoomInfoViewTemplate){

	var MatchesView = Backbone.View.extend({

		template:  _.template(ChatRoomInfoViewTemplate),

		initialize: function(options) {
			var that = this;
			this.parent_el = options.parent_el;
			this.chatRoomModel = new ChatRoomModel({
				id: options.roomId
			});
		},

		render: function(collection){
			var that = this;
			
			this.chatRoomModel.fetch({
				success: function(model, response, options){
					that.$el.html(that.template(response))
					that.parent_el.html(that.$el);
				},
				error: function(response) {
					console.log("Error");
				}
			});
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});