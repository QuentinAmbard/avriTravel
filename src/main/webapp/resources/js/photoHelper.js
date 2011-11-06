var PhotoHelper = new Class({
	Implements : [ Options ],
	options : {},
	avritravel : null,
	photos: new Array(),
	allPhotos: new Array(),
	lines: new Array(),
	color: 0xFFFFFF,
	timer: null,
	initialize : function(avritravel, options) {
		this.setOptions(options);
		this.avritravel = avritravel;
		var that = this;
		
		timeLine.addEvent("displayAlbum", function(album){
				that.display(album);
			});
		timeLine.addEvent("hideAlbum", function(){
			that.pause();
		});
	},

	addPhoto : function(currentPhoto) {
		var newPhoto = new Photo(currentPhoto);
		this.avritravel.scene.addObject(newPhoto.photoObject3d);
		
		this.photos.push(newPhoto);
	},
	
	displayNextPhoto: function (photoNumber) {
		
		var currentPhoto = this.allPhotos[photoNumber];
		var lat = currentPhoto.latlng.lat;
		var lng = currentPhoto.latlng.lng;
		
		if(this.photos.length != 0) {
			
			var animate = function(points, j, color, lat1, lng1, lat2, lng2) {
				
				if(j==0){
					var distance = Math.sqrt( Math.pow(lat1-lat2,2) + Math.pow(lng1-lng2,2) );
					if(distance > 8) {
						that.avritravel.moveLinear = true;
						that.avritravel.distanceTarget = 1000;
					}
				} else if(j > points.length /2){
					that.avritravel.distanceTarget = 250;
				}
				
				var latTmp = (lat1*(points.length-j)+(lat2*j))/points.length;
				var lngTmp = (lng1*(points.length-j)+(lng2*j))/points.length;
				that.avritravel.setGlobePosition(latTmp, lngTmp);
				

				// var geolocTmp = GB.geoUtils.geGeoFromVector3D(points[j]);
				// that.avritravel.setGlobePosition(geolocTmp[0], geolocTmp[1]);
				
				var p = [ points[j], points[j + 1] ];
				var line = GB.geoUtils.getLine(p, color);
				(function(line) {
					that.lines.push(line);
				})(line);
				that.avritravel.scene.addObject(line);
				j++;
				if (j < points.length - 1) {
					that.timer = window.setTimeout(function() {
						animate(points, j, color, lat1, lng1, lat2, lng2);
					}, 70);
				} else {
					var lastPhoto = that.photos[that.photos.length-1];
					that.avritravel.setGlobePosition(lastPhoto.lat, lastPhoto.lng);
					lastPhoto.showPhoto();
					that.avritravel.moveLinear = false;
					that.timer = setTimeout(function(){
							if(photoNumber + 1 < that.allPhotos.length) {
								that.displayNextPhoto(photoNumber+1);
							} else {
								lastPhoto.unShowPhoto();
								timeLine.displayAllAlbum();
								that.avritravel.distanceTarget = 600;
							}
						},3000);
				}
			};
			var lastPhoto = this.photos[this.photos.length-1];
			var v1 = GB.geoUtils.getVector3D(lastPhoto.lat, lastPhoto.lng);
			var v2 = GB.geoUtils.getVector3D(lat, lng);
			var points = GB.geoUtils.getInterpolatedVector(v1, v2);
			
			//calculate the time to go to the next photo
			timeLine.moveToPicture(currentPhoto, 1000+points.length*70+500);
			
			var that = this;
			(function(points, j, lat1, lng1, lat2, lng2) {
				animate(points, j, that.color, lat1, lng1, lat2, lng2);
			})(points, 0, lastPhoto.lat, lastPhoto.lng, lat, lng);
			
			lastPhoto.unShowPhoto();
			
		} else {
			this.avritravel.distanceTarget = 250;
			this.avritravel.setGlobePosition(lat, lng);
			
			var that = this;
			that.timer = setTimeout(function(){
				that.photos[that.photos.length-1].showPhoto();
				that.timer = setTimeout(function(){
					if(photoNumber < that.allPhotos.length) {
						that.displayNextPhoto(photoNumber+1);
					}
				},3000);
			} , 1000);
		}
		
		this.addPhoto(currentPhoto);	
	},
	
	display: function(album) {
		this.pause;
		this.resetMap();
		this.color = album.colorHexa;
		this.allPhotos = album.pictures;
		this.displayNextPhoto(0);
	},
	

	pause : function() {
		if (this.timer) {
			clearTimeout(this.timer);
		}
	},
	
	resetMap: function() {
		var size = this.lines.length;
		for(var i=0; i<size; i++) {
			this.avritravel.scene.removeChild(this.lines.pop());
		}
		
		size = this.photos.length;
		for(var i=0; i<size; i++) {
			this.avritravel.scene.removeChild(this.photos.pop().photoObject3d);
		}
		
		this.allPhotos = new Array();
	}
});