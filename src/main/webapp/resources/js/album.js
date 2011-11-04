var Album = new Class({
	Implements: [Options, Events],
	options: {
		
	},
	name: "",
	pictures: [],
	startDate: 1315169892,
	endDate: 1320443892,
	left: 0,
	color:"",
	initialize: function(name, pictures, color, options){
		this.name =name ;
		this.pictures = pictures;
		this.color = color;
		this.text = new Element('div', {'class': 'album', html: name});
		this.vBar = new Element('div', {'class': 'albumV'});
		this.point = new Element('div', {'class': 'albumPoint'});
		this.dom = new Element('div', {'class': 'albumContainer', styles: {"background-color": color}});
		this.text.inject(this.dom, 'top');
		this.vBar.inject(this.dom, 'top');
		this.point.inject(this.dom, 'top');
	},
	injectToTimeLine: function (left, width) {
		var delta = $('timeLineBar').position.y ;
		console.log(delta);
		this.left = left + delta;
		this.dom.setStyle('left', left);
		this.dom.setStyle('width', width);
		this.dom.inject($('timeLine'), 'top');
	}
});