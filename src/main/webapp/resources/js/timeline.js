var TimeLine = new Class({
	Implements: [Options, Events],
	options: {
		
	},
	albums: [],
	initialize: function(options){
		this.timeLineBar = $('timeLineBar') ;
		this.timeLine = $('timeLine') ;
		this.cursor = $('cursor');
		this.leftTimeLineBar = this.timeLineBar.getPosition().x ;
		this.rightTimeLineBar = this.timeLineBar.getPosition().x+this.timeLineBar.getSize().x ;
	},
	colors: ["#d637d6", "#d63a3a", "#7d66ed", "#d637d6", "#d63a3a", "#7d66ed"],
	moveToPicture: function (picture, time) {
		//Move the cursor:
		var that = this ;
		var d = picture.timestamp -clockDate;
		var left = Math.round(d/that.secPerPixel) +this.leftTimeLineBar;
		this.cursor.set('morph', {duration: time});
		this.cursor.morph({left: left});
		
		new TWEEN.Tween( {p: clockDate} ).to( { p: picture.timestamp}, time ).easing( TWEEN.Easing.Quadratic.EaseInOut ).onUpdate( function() {
			setClock(Math.round(this.p));
		}).onComplete(function () {return this;}).start();
		//setTimeout(function () {that.moveToPicture(that.albumDisplayed.pictures[1], time);}, 3000);
	},
	init: function(albums) {
		var dateMin = 9999999999999999999;
		var dateMax = 0;
		var totalLenght = 0;
		for(var i =0;i<albums.length;i++) {
			var dateMin = Math.min(dateMin, albums[i].startDate);
			var dateMax = Math.max(dateMax, albums[i].endDate);
			totalLenght += albums[i].endDate - albums[i].startDate
		}
		var secPerPixel = (dateMax - dateMin)/(this.timeLineBar.getSize().x-13); //13: mauvaise valeur, bug scroll ?

		for(var i =0;i<albums.length;i++) {
			var album = new Album( albums[i], this.colors[i]);
			var width = (albums[i].endDate - albums[i].startDate)/secPerPixel ;
			console.log(albums[i].endDate - albums[i].startDate);
			console.log("width"+width);
			var left = (albums[i].startDate-dateMin)/secPerPixel;
			console.log("left"+left);
			this.injectAlbum(album, left, width);
		}
	},
	injectAlbum: function (album, left, width) {
		album.left = left + this.timeLineBar.getPosition().x;
		album.width = width;
		album.dom.setStyle('left', album.left);
		album.dom.setStyle('width', width);
		album.dom.inject(this.timeLineBar, 'top');
		album.initEvents();
		this.albums.push(album);
		var that = this;
		album.dom.addEvent('click', function () {
			if (that.status == 0) {
				that.displayAlbum(album);
			} else if (that.status == 1) {
				that.displayAllAlbum(album);
			}
		});
	},
	status: 0,
	albumDisplayed: null,
	displayAllAlbum: function () {
		this.cursor.fade(0);
		this.status=-1;
		var that = this;
		//Hide pictures
		for(var i =0;i<that.albumDisplayed.picturesDom.length;i++) {
			var pict = that.albumDisplayed.picturesDom[i];
			pict.set('morph', {duration: 'long'});
			pict.get('morph').chain(function () {
				this.element.dispose();
			});
			pict.morph({left: 0});
		}
		
		var max = that.albumDisplayed.dom.getSize().x-that.albumDisplayed.width;
		for (var i=0;i<that.albums.length;i++) {
			var album = that.albums[i];
			if(that.albumDisplayed.id == album.id) {
				(function (album) {
					var d =0;
					var lp =0;
					new TWEEN.Tween( {p: 0} ).to( { p: max }, 2000 ).easing( TWEEN.Easing.Quadratic.EaseInOut ).onUpdate( function() {
						var d = this.p-lp;
						lp = this.p;
						var left = Number.from(album.dom.getStyle('left'));
						var width = Number.from(album.dom.getStyle('width'));
						
						var newLeft = left+d ;
						var newWidth= width-d ;
						if(newLeft<album.left) {
							album.dom.setStyle('left', newLeft);
							newWidth = newWidth- d ;
						} else {
							album.dom.setStyle('left', album.left);
						}
						if(newWidth<=album.width) {
							newWidth = album.width;
						} 
						album.dom.setStyle('width', newWidth);
					}).onComplete(function () {that.status = 0; return this;}).start();
				})(album);
			} else if(album.left<that.albumDisplayed.left) {
				(function (album) {
					var d =0;
					var lp =0;
					var max = Math.max(album.width, album.left-that.leftTimeLineBar);
					new TWEEN.Tween( {p: 0} ).to( { p: max }, 1500 ).easing( TWEEN.Easing.Quadratic.EaseInOut ).onUpdate( function() {
						var d = this.p-lp;
						lp = this.p;
						that.moveToReverse(album, d, 1, 0, that.leftTimeLineBar);
					}).onComplete(function () {that.status = 0; return this;}).start();
				})(album);
			} else {
				(function (album) {
					var d =0;
					var lp =0;
					var max = Math.max(album.width, that.rightTimeLineBar-album.left);
					new TWEEN.Tween( {p: 0} ).to( { p: max }, 1500 ).easing( TWEEN.Easing.Quadratic.EaseInOut ).onUpdate( function() {
						var d = this.p-lp;
						lp = this.p;
						that.moveToReverse(album, d, -1, that.rightTimeLineBar);
					}).onComplete(function () {that.status = 0; return this;}).start();
				})(album);
			}
		}
	},
	secPerPixel: 10,
	displayAlbum: function (albumToDisplay) {
		this.cursor.setStyle('left', this.leftTimeLineBar);
		this.cursor.fade(1);
		setClock(albumToDisplay.startDate);
		this.fireEvent("displayAlbum", albumToDisplay);
		this.albumDisplayed = albumToDisplay;
		this.status = 2 ;
		
		//Display images:
		this.secPerPixel = (albumToDisplay.endDate-albumToDisplay.startDate)/this.timeLineBar.getSize().x;
		var lastLeft = 0 ;
		var lastTimestamp = albumToDisplay.startDate ;
		var pictureWidth = albumToDisplay.picture.getStyle('width').toInt();
		for(var i =0;i<albumToDisplay.pictures.length;i++) {
			var picture = albumToDisplay.pictures[i];
			var delta = Math.round((picture.timestamp-lastTimestamp)/ this.secPerPixel);
			if(delta>pictureWidth) {
				var left = Math.round((picture.timestamp-albumToDisplay.startDate)/ this.secPerPixel);
				lastTimestamp = picture.timestamp ;
				var pictureDom = new Element('img', {'class': 'albumImg', width: "52px",  height: "38px", src: picture.thumbnailLink});
				pictureDom.inject(albumToDisplay.dom, 'top');
				pictureDom.reflect({/* Put custom options here */});
				var t = albumToDisplay.dom.getFirst();
				t.set('morph', {duration: 'long'});
				t.morph({left: left});
				var that = this ;
				(function (picture) {
					t.addEvent('click', function (e) {
						e.stop();
						that.fireEvent('displayPicture', picture);
						console.log(picture);
					});
				})(picture);
				albumToDisplay.picturesDom.push(t);
			}
		}
		
		var that = this;
		var l = Number.from(albumToDisplay.dom.getStyle("left"));
		var max = Math.max(l-this.leftTimeLineBar, 
				this.rightTimeLineBar-l-Number.from(albumToDisplay.width)) +50;
		var d =0;
		var lp =0;
		new TWEEN.Tween( {p: 0} ).to( { p :max }, 1500 ).easing( TWEEN.Easing.Quadratic.EaseInOut ).onUpdate( function() {
			var d = this.p-lp;
			lp = this.p;
			for (var i=0;i<that.albums.length;i++) {
				var album = that.albums[i];
				if(albumToDisplay.id == album.id) {
					var left = Number.from(album.dom.getStyle('left'));
					var width = Number.from(album.dom.getStyle('width'));
					var newLeft = left-d ;
					var newWidth = width+d ;
					if(newLeft>that.leftTimeLineBar) {
						album.dom.setStyle('left', newLeft);
						newWidth += d ;
					} else {
						album.dom.setStyle('left', that.leftTimeLineBar);
					}
					if(width<=that.timeLineBar.getSize().x+album.left-that.leftTimeLineBar) {
						var sizeMax = that.timeLineBar.getSize().x+ (that.leftTimeLineBar-Number.from(album.dom.getStyle('left')));
						newWidth = Math.min(newWidth, sizeMax);
						album.dom.setStyle('width', newWidth);
					} else {
						album.dom.setStyle('width', that.timeLineBar.getSize().x);
					}
				}
				else if(album.left<albumToDisplay.left) {
					that.moveTo(album, d, -1, 0, that.leftTimeLineBar);
				} else {
					that.moveTo(album, d, 1, 1, that.rightTimeLineBar);
				}
			}
		}).onComplete(function () {that.status = 1; return this;}).start();
	},
	moveToReverse: function (album, p, way, limit) {
		var left = Number.from(album.dom.getStyle('left'));
		var newLeft = left+way*p ;
		var width = Number.from(album.dom.getStyle('width')) ;
		if((way == 1 && newLeft>limit) || (way == -1 && newLeft<limit)) {
			album.dom.setStyle('display', 'block') ;
			if(width<album.width) {
				newWidth = Math.min(width+p, album.width);
				album.dom.setStyle('width', newWidth) ;
			}
			if((way == 1 && left<album.left) || (way == -1 && left>album.left)) {
				if(way == 1 )
					newLeft = Math.min(left+p*way, album.left);
				else
					newLeft = Math.max(left+p*way, album.left);
				album.dom.setStyle('left', newLeft) ;
			}
		}
	},
	moveTo: function (album, p, way, useWidth, limit) {
		var left = Number.from(album.dom.getStyle('left'));
		var newLeft = left+way*p ;
		var width = Number.from(album.dom.getStyle('width')) ;
		if((way == 1 && newLeft+width>limit) || (way == -1 && newLeft<limit)) {
			if(left > newLeft-width*useWidth-p) {
				width = width-p ;
				if(width<=1) {
					album.dom.setStyle('display', 'none') ;
				} else {
					album.dom.setStyle('width', width) ;
				}
			}
			album.dom.setStyle('left', limit-width*useWidth);
		} else {
			album.dom.setStyle('left', newLeft);
		}
	}
	
});