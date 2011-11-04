var Circle = new Class({
	Implements: [Options, Events],
	options: {
	},
	scene: null,
	initialize: function(users, options){
		this.setOptions(options);
	}
});