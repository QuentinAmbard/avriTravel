var City = new Class({
	Implements: [Options],
	options: {
	},
	name: '',
	longitude: 0,
	latitude: 0,
	cityObject3d: null,
	users: new Array(),
	cityName3d: null,
	tempLine: null,
	initialize: function(latitude, longitude, name, scene, options){
		this.setOptions(options);
		this.name = name;
		this.longitude = longitude;
		this.latitude = latitude;
		this.cityObject3d =  new THREE.Mesh (
				new THREE.PlaneGeometry( 10, 10)/*,
				new THREE.MeshBasicMaterial( { color: 0xCCFFCC, opacity:0.1 } )*/
		);
		
		this.cityObject3d.position = GB.geoUtils.getVector3D(latitude, longitude);
		this.cityObject3d.useQuaternion  = true;
		var v = new THREE.Vector3(-latitude*2,  -90*2+longitude*2, 0);
		var quaternion = new THREE.Quaternion ();
		quaternion.setFromEuler(v);
		this.cityObject3d.quaternion = quaternion;
		//this.cityObject3d.rotation.y=-Math.PI/2;
		
		scene.addObject(this.cityObject3d);
	},
	addUser: function(user){
		user.city = this;
		this.users.push(user);
		if(this.users.length<=100) {
			this.cityObject3d.addChild(user.userObject3d);
			user.userObject3d.position.x = 0;//Math.cos( ( (this.users.length-1)*2*Math.PI ) / (Math.sqrt(this.users.length)*2) + Math.PI/2 ) * (this.users.length/7+2);
			user.userObject3d.position.y = 0;//Math.sin( ( (this.users.length-1)*2*Math.PI ) / (Math.sqrt(this.users.length)*2) + Math.PI/2 ) * (this.users.length/7+2);
			user.userObject3d.position.z = -3-0.5*this.users.length;
		}
	},
	removeAllUsers: function(){
		var size = this.users.length;
		for(var i=0; i<size; i++) {
			var user = this.users.pop() ;
			for (var c=0;c<THREE.Collisions.colliders.length;c++) {
				if(user.userObject3d.id==THREE.Collisions.colliders[c].mesh.id) {
					THREE.Collisions.colliders.splice(c, 1);
				}
			}
			this.cityObject3d.removeChild(user.userObject3d);
		}
	},
	defaultUserPosition: function() {
		for(var i=0; i<this.users.length;i++) {
			this.users[i].userObject3d.position.x = 0;
			this.users[i].userObject3d.position.y = 0;
			this.users[i].userObject3d.position.z = 1+0.5*i;
		}
		this.cityObject3d.removeChild(this.cityName3d);
		this.cityObject3d.removeChild(this.tempLine);
	},
	animateUsers: function(){
		var animate = function (user, finalPosition) {
			if(user.userObject3d.position.z < finalPosition) {
				user.userObject3d.position.z += 0.33;
				window.setTimeout( function(){animate(user, finalPosition);}, 25);
				
			}
		};
		
		var that = this;
		for(var i=0; i<this.users.length; i++) {
			(function(user, finalPosition) {
				animate(user, finalPosition);
			})(that.users[i], 1+0.5*i);
		}
	},
	displayContacts: function(user){
		var cote = Math.floor(Math.sqrt(this.users.length)*1.5);
		var x = cote*(-140/40/2) + 140/40/2;
		var y = cote/2*(185/40/2);
		for(var i=0; i<this.users.length; i++) {
			var userPosition = this.users[i].userObject3d.position;
			userPosition.z = 40;
			userPosition.x = x;
			userPosition.y = y;
			x+=140/40;
			if((i+1)%cote==0) {
				y-=185/40;
				x=cote*(-140/40/2) + 140/40/2;
			}
		}
		this.displayCityName();
		var points = [new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,40)];
		this.tempLine = GB.geoUtils.getLine(points, 0xEBCA14);
		this.cityObject3d.addChild(this.tempLine);
		GB.social.display(user);
	},
	select: function(){
		
	},
	displayCityName: function(){
		if(this.name != "") {
			var textMaterialFront = new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );//new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } );
			var textMaterialSide = new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );//new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } );
			textGeo = new THREE.TextGeometry( this.name, {
					size: 2.5,
					height: 0.1,
					curveSegments: 0,
	
					font: "optimer",
					weight: "normal",
					style: "normal",
	
					bevelThickness: 2,
					bevelSize: 1.5,
					bevelEnabled: false,
	
					bend: false,
	
					material: textMaterialFront,
					extrudeMaterial: textMaterialSide
	
				});
			
			var cote = Math.floor(Math.sqrt(this.users.length)*1.5);
			var y = cote/2*(185/40/2);
	
			var textMesh1 = new THREE.Mesh( textGeo, new THREE.MeshFaceMaterial() );
			textMesh1.position.x = -textGeo.boundingSphere.radius/2;
			textMesh1.position.y = y+5;
			textMesh1.position.z = 40;
			this.cityObject3d.addChild( textMesh1 );
			this.cityName3d = textMesh1;
		}
	}
});