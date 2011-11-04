var GeoViadeo2d = new Class({
	Implements: [Options, Events],
	options: {
	},
	scene: null,
	initialize: function(container , options){
		this.setOptions(options);
		this.container = document.getElementById(container);
	},
	addUser: function (x, y, z) {
		var user = new User(x,y,z,this.scene);
	}
});