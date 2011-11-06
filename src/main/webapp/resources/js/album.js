var Album = new Class({
	Implements: [Options, Events],
	options: {
		deltaTopHover: 20
	},
	picturesDom: [],
	left: 0,
	color:"",
	initialize: function(obj, color, colorHexa, options){
		for(var i in obj) {
			this[i] = obj[i];
		}
		this.colorHexa = colorHexa;
		this.color = color;
		this.text = new Element('div', {'class': 'album', html: this.title, styles: {"border-bottom-color": color}});
		this.date = new Element('div', {'class': 'albumDate', html: this.startDate, styles: {"border-bottom-color": color}});
		this.vBar = new Element('div', {'class': 'albumV', styles: {"border-right-color": color}});
		this.point = new Element('div', {'class': 'albumPoint', styles: {"background-color": color}});
		picture = this.pictures[0];
		this.picture = new Element('img', {'class': 'albumImg', width: "52px",  height: "38px", src: picture.thumbnailLink});
		this.dom = new Element('div', {'class': 'albumContainer', styles: {"background-color": color}});
		this.text.inject(this.dom, 'top');
		this.vBar.inject(this.dom, 'top');
		this.point.inject(this.dom, 'top');
		this.picture.inject(this.dom, 'top');
		//this.picture.reflect({/* Put custom options here */});
		this.picture = this.dom.getFirst();
	},
	initEvents: function () {
		this.initTop = Number.from(this.text.getStyle('top'));
		this.initHeight = Number.from(this.vBar.getStyle('height'));
		this.initTopV = Number.from(this.vBar.getStyle('top'));
		var that = this ;
		this.dom.addEvents({'mouseenter': function () {
				that.goUp();
			},
			'mouseleave': function () {
				that.goDown();
			}
		});
	},
	goUp: function () {
		this.text.morph({top: this.initTop-this.options.deltaTopHover*2, "padding-left": 15});
		this.vBar.morph({"top": this.initTopV-this.options.deltaTopHover+5, "height": this.initHeight+ this.options.deltaTopHover});
	},
	goDown: function () {
		this.text.morph({top: this.initTop, "padding-left": 0});
		this.vBar.morph({height: this.initHeight, top: this.initTopV});
	}
	
});