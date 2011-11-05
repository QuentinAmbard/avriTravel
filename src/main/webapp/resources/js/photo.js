var Photo = new Class({
	Implements: [Options],
	options: {
	},
	photoObject3d: null,
	bgObject3d: null,
	pictureObject3d: null,
	lat: 0,
	lng: 0,
	initialize: function(lat, lng, imageUrl, options){
		this.setOptions(options);
		this.lat = lat;
		this.lng = lng;
		
		
		this.photoObject3d =  new THREE.Mesh (
				new THREE.SphereGeometry( 1, 1),
				new THREE.MeshBasicMaterial( { color: 0xFFFFFF, opacity:1 } )
		);
		this.photoObject3d.position = GB.geoUtils.getVector3D(lat, lng, 210);
		this.photoObject3d.useQuaternion  = true;
		var v = new THREE.Vector3(-lat*2,  -90*2+lng*2, 0);
		var quaternion = new THREE.Quaternion ();
		quaternion.setFromEuler(v);
		this.photoObject3d.quaternion = quaternion;
		
		this.bgObject3d = new THREE.Mesh(
				new THREE.PlaneGeometry( 32, 20),
				new THREE.MeshBasicMaterial( { color: 0xFFFFFF, opacity:1 } )
				);
		
		this.bgObject3d.position.x = 0;
		this.bgObject3d.position.y = 0;
		this.bgObject3d.position.z = 0;//10;
		this.bgObject3d.useQuaternion = true;
		
		this.pictureObject3d = new THREE.Mesh(
			new THREE.PlaneGeometry( 31, 19),
			new THREE.MeshLambertMaterial( {
				/*shading: THREE.SmoothShading,*/
				map: THREE.ImageUtils.loadTexture( "resources/images/photosample.jpg" )
				})
			);
		this.pictureObject3d.position.x = 0;
		this.pictureObject3d.position.y = 0;
		this.pictureObject3d.position.z = this.bgObject3d.position.z+0.4;
		this.pictureObject3d.useQuaternion = true;
		
		this.photoObject3d.addChild(this.bgObject3d);
		this.photoObject3d.addChild(this.pictureObject3d);
		
		this.photoObject3d.scale = new THREE.Vector3( 0.2, 0.2, 0.2 );
	},
	
	showPhoto: function(){
		var that = this;
		var animate = function(start, current, end) {
			if(end >= current) {
				current += 0.05;
				that.photoObject3d.scale = new THREE.Vector3( current, current, current );
				setTimeout(function() {
					animate(start, current, end);
				}, 40);
			}
		};
		
		(function(start, end) {
			animate(start, start, end);
		})(0.2,0.6);
	},
	
	unShowPhoto: function(){
		var that = this;
		var animate = function(start, current, end) {
			if(end <= current) {
				current -= 0.05;
				that.photoObject3d.scale = new THREE.Vector3( current, current, current );
				setTimeout(function() {
					animate(start, current, end);
				}, 40);
			}
		};
		
		(function(start, end) {
			animate(start, start, end);
		})(0.6,0.2);
	}
});