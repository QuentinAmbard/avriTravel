var PhotoHelper = new Class({
	Implements : [ Options ],
	options : {},
	avritravel : null,
	photos: new Array(),
	lines: new Array(),
	initialize : function(avritravel, options) {
		this.setOptions(options);
		this.avritravel = avritravel;
	},

	addPhoto : function(lat, lng, imageUrl) {
		var newPhoto = new Photo(lat,lng,imageUrl);
		this.avritravel.scene.addObject(newPhoto.photoObject3d);
		
		this.photos.push(newPhoto);
	},
	
	displayNextPhoto: function (lat, lng, imageUrl) {
		if(this.photos.length != 0) {
			
			var animate = function(points, j, color, lat1, lng1, lat2, lng2) {
				
				if(j==0){
					that.avritravel.moveLinear = true;
					that.avritravel.distanceTarget = 1000;
				} else if(j > points.length /2){
					that.avritravel.distanceTarget = 250;
				}
				
				//var latTmp = (lat1*(points.length-j)+(lat2*j))/points.length;
				//var lngTmp = (lng1*(points.length-j)+(lng2*j))/points.length;
				//that.avritravel.setGlobePosition(latTmp, lngTmp);
				
				var geolocTmp = GB.geoUtils.geGeoFromVector3D(points[j]);
				that.avritravel.setGlobePosition(geolocTmp[0], geolocTmp[1]);
				
				var p = [ points[j], points[j + 1] ];
				var line = GB.geoUtils.getLine(p, color);
				(function(line) {
					that.lines.push(line);
				})(line);
				that.avritravel.scene.addObject(line);
				j++;
				if (j < points.length - 1) {
					window.setTimeout(function() {
						animate(points, j, color, lat1, lng1, lat2, lng2);
					}, 50);
				} else {
					var lastPhoto = that.photos[that.photos.length-1];
					that.avritravel.setGlobePosition(lastPhoto.lat, lastPhoto.lng);
					lastPhoto.showPhoto();
					that.avritravel.moveLinear = false;
				}
			};
			var lastPhoto = this.photos[this.photos.length-1];
			var v1 = GB.geoUtils.getVector3D(lastPhoto.lat, lastPhoto.lng);
			var v2 = GB.geoUtils.getVector3D(lat, lng);
			var points = GB.geoUtils.getInterpolatedVector(v1, v2);
			
			var that = this;
			(function(points, j, lat1, lng1, lat2, lng2) {
				setTimeout(function() {
					animate(points, j, 0xFF0000, lat1, lng1, lat2, lng2);
				}, 1000);
			})(points, 0, lastPhoto.lat, lastPhoto.lng, lat, lng);
			
			lastPhoto.unShowPhoto();
			
		} else {
			this.avritravel.distanceTarget = 250;
			this.avritravel.setGlobePosition(lat, lng);
			
			var that = this;
			setTimeout(function(){
				that.photos[that.photos.length-1].showPhoto();
			} , 1000);
		}
		
		this.addPhoto(lat,lng,imageUrl);	
	}
});