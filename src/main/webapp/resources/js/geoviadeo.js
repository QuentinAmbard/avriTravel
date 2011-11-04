var PI_HALF = Math.PI / 2;
var GeoViadeo = new Class({
	Implements : [ Options, Events ],
	options : {
		globeImageUrl : 'resources/images/',
		radius : 200
	},
	me : null,
	cities : [],
	selectedUser : null,
	scene : null,
	renderer : null,
	globe : null,
	camera : null,
	overRenderer : null,
	distance : 100000,
	distanceTarget : 100000,
	mouseUp : false,
	rotationAuto: true,
	timerBeforeRotationAuto: null,
	lines: [],
	rotation : {
		x : -Math.PI/3,
		y : Math.PI/6
	},
	target : {
		x : Math.PI * 3 / 2,
		y : Math.PI / 6.0
	},
	mouse : {
		x : 0,
		y : 0
	},
	mouseOnDown : {
		x : 0,
		y : 0
	},
	targetOnDown : {
		x : 0,
		y : 0
	},
	curZoomSpeed : 0,
	initialize : function(container, options) {
		this.setOptions(options);
		this.container = document.id(container);
		this.scene = new THREE.Scene();
		var w = container.offsetWidth || window.innerWidth;
		var h = container.offsetHeight || window.innerHeight;

		this.camera = new THREE.Camera(30, w / h, 1, 10000);
		this.camera.position.z = this.distance;

		this.renderer = new THREE.WebGLRenderer({
			antialias : true
		});
		this.renderer.autoClear = false;
		this.renderer.setClearColorHex(0x000000, 0.0);
		this.renderer.setSize(w, h);

		this.renderer.domElement.style.position = 'absolute';

		this.container.appendChild(this.renderer.domElement);
		this.globe = new DAT.Globe(this.scene, this.options.globeImageUrl, this.options.radius);
		var that = this;
		var timer; 
		$(container).addEvents({
		    'click': function(e){
		        $clear(timer);
		        timer = (function(){
		        	that.onClick(e);
		        }).delay(200, this);
		    },
		    'dblclick': function(e){
		        $clear(timer);
		        that.onDoubleClick(e);
		    }

		}); 
		this.container.addEventListener('mousedown', this.onMouseDown.bind(this), false);
		this.container.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
		this.container.addEventListener('DOMMouseScroll', this.onMouseWheel.bind(this), false);
		document.addEventListener('keydown', this.onDocumentKeyDown.bind(this), false);
		window.addEventListener('resize', this.onWindowResize.bind(this), false);
		this.container.addEventListener('mousemove', this.onMouseMove.bind(this), false);
		this.container.addEventListener('mouseup', this.onMouseUp.bind(this), false);
		this.container.addEventListener('mouseout', this.onMouseOut.bind(this), false);
		
		$('hideRightPanel').addEventListener('click', this.unselectCity.bind(this), false);
		$('rightPanel').set('styles', {
		    right: -390,
		    display: 'block'
		});

		
		this.container.addEventListener('mouseover', function() {
			that.overRenderer = true;
		}, false);
		this.container.addEventListener('mouseout', function() {
			that.overRenderer = false;
		}, false);

		var stars = new Stars();
		this.scene.addChild(stars.particleSystem);
	},
	displayLoader: function () {
		$('loader').setStyle("display","inline");
		$('loader').fade(1);
	},
	hideLoader: function () {
		new Fx.Tween('loader').start('opacity',0).chain(function() {
				$('loader').setStyle("display: none");
		});
	},
	/**
	 * A single profile has been found.
	 */
	displayProfile : function(userId, profile) {
		$('meName').set('html', profile.first_name+' '+profile.last_name);
		if (userId == "me") {
			this.me = profile;
		}
	},
	displayProfiles : function(profilesSorted) {
		var that = this;
		if (this.me == null) {
			window.setTimeout(function() {
				that.displayProfiles(profilesSorted);
			}, 100);
		} else {
			var size = profilesSorted.length;
			for ( var i = 0; i < size; i++) {
				var profiles = profilesSorted[i];
				var cityId = this.cities.length;
				var newLat = profiles[0].location.latitude;
				var newLon = profiles[0].location.longitude;
				for ( var k = 0; k < this.cities.length; k++) {
					var distance = Math.sqrt(Math.pow((newLat - this.cities[k].latitude) / 2, 2) + Math.pow((newLon - this.cities[k].longitude) / 2, 2));
					if (distance < 1) {
						cityId = k;
						break;
					}
				}
				if(newLat != null) {
					if (cityId == this.cities.length) {
						var cityName;
						if (profiles[0].location.city != "") {
							cityName = profiles[0].location.city;
						} else if (profiles[0].location.zipcode != "") {
							cityName = profiles[0].location.zipcode;
						} else if (profiles[0].location.country != "") {
							cityName = profiles[0].location.country;
						}
						this.addCity(newLat, newLon, GB.textNormalizer(GB.stripaccents(cityName)));
					}
				}
				for ( var j = 0; j < profiles.length; j++) {
					var profile = profiles[j];
					if(profile.has_picture) {
						profile.imageId = profile.link.substr(profile.link.indexOf('profile/') + 8, profile.link.length);
						profile.imageUrl = 'proxy/' + profile.imageId;
					} else {
						profile.imageUrl = 'resources/images/noProfile.gif';
					}
					if(!(profile.location.latitude==0 && profile.location.longitude==0) && 
							!(profile.location.latitude=="" && profile.location.longitude=="") && 
							!(profile.location.latitude==null && profile.location.longitude==null)) {
						this.addUser(profile, cityId);
					}
				}
			}
			var animate = function(city, points, j, color) {
				var p = [ points[j], points[j + 1] ];
				var line = GB.geoUtils.getLine(p, color);
				(function(line) {
					that.lines.push(line);
				})(line);
				that.scene.addObject(line);
				j++;
				if (j < points.length - 1) {
					window.setTimeout(function() {
						animate(city, points, j, color);
					}, 50);
				} else {
					city.animateUsers();
				}
			};

			for ( var k = 0; k < this.cities.length; k++) {
				var v1 = GB.geoUtils.getVector3D(this.me.location.latitude, this.me.location.longitude);
				var v2 = GB.geoUtils.getVector3D(this.cities[k].latitude, this.cities[k].longitude);
				var points = GB.geoUtils.getInterpolatedVector(v1, v2);
				// this.scene.addObject(GB.geoUtils.getLine(points, 0x00FFCC));
				var that = this;
				(function(city, points, j) {
					setTimeout(function() {
						animate(city, points, j, 0xEBCA14);
					}, 1000);
				})(this.cities[k], points, 0);
			}
		}
	},
	addCity : function(lat, lon, name) {
		var city = new City(lat, lon, name, this.scene);
		this.cities.push(city);
	},
	unselectCity: function() {
		if(this.selectedUser!=null) {
			this.selectedUser.city.defaultUserPosition();
			this.selectedUser = null;
			$("rightPanel").tween('right', -390);
		}
	},
	removeAllCities: function() {
		this.unselectCity();
		var size = this.cities.length;
		for(var i=0; i<size; i++){
			this.cities.pop().removeAllUsers();
		}
		
		size = this.lines.length;
		for(var i=0; i<size; i++) {
			var line = this.lines.pop();
			this.scene.removeChild(line);
		}
	},
	drawLine : function() {
		var v1 = GB.geoUtils.getVector3D(10, 30);
		var v2 = GB.geoUtils.getVector3D(45, 150);
		var points = GB.geoUtils.getInterpolatedVector(v1, v2);
		var i = 0;
		var that = this;
		var animate = function() {
			var p = [ points[i], points[i + 1] ];
			var line = that.geoUtils.getLine(p, 0x00FFCC);
			
			that.scene.addObject(line);
			i++;
			if (i < points.length - 1) {
				window.setTimeout(animate, 50);
			}
		};
		animate();
	},
	start : function() {
		this.animate();
	},
	addUser : function(profile, city) {
		var u = new User(profile);
		this.cities[city].addUser(u);
	},
	findUserByMesh : function(mesh) {
		for ( var i = 0; i < this.cities.length; i++) {
			for ( var j = 0; j < this.cities[i].users.length; j++) {
				if (this.cities[i].users[j].userObject3d == mesh) {
					return this.cities[i].users[j];
				}
			}
		}
		return null;
	},
	onDoubleClick: function (event) {
		var mouse = {
				x : 0,
				y : 0
			};
			mouse.x = (event.client.x / window.innerWidth) * 2 - 1;
			mouse.y = -(event.client.y / window.innerHeight) * 2 + 1;
			var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);

			var projector = new THREE.Projector();
			projector.unprojectVector(vector, this.camera);

			var ray = new THREE.Ray(this.camera.position, vector.subSelf(this.camera.position).normalize());
			var c = THREE.Collisions.rayCastNearest(ray);

			if (c) {
				var user = this.findUserByMesh(c.mesh);
				if (this.me.id != user.profile.id) {
					GB.geoViadeo.displayProfile('me', user.profile);
					GB.viadeo.getContacts(user.profile.id);
				}
			}
	},
	onClick : function(event) {
		var mouse = {
			x : 0,
			y : 0
		};
		mouse.x = (event.client.x / window.innerWidth) * 2 - 1;
		mouse.y = -(event.client.y / window.innerHeight) * 2 + 1;
		var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);

		var projector = new THREE.Projector();
		projector.unprojectVector(vector, this.camera);

		var ray = new THREE.Ray(this.camera.position, vector.subSelf(this.camera.position).normalize());
		var c = THREE.Collisions.rayCastNearest(ray);

		if (c) {
			// c.mesh.materials[ 0 ].color.setHex( 0xaaaaaa );
			var user = this.findUserByMesh(c.mesh);

			if (this.selectedUser != user) {
				if (this.selectedUser != null) {
					this.selectedUser.city.defaultUserPosition();
				} else {
					$("rightPanel").tween('right', 0);
				}

				this.selectedUser = user;
				this.selectedUser.city.displayContacts(this.selectedUser);
				
				this.target.x = (this.selectedUser.city.longitude - 90 + 360) * Math.PI / 180 + Math.floor(this.rotation.x/(2*Math.PI))*2*Math.PI;
				this.target.y = this.selectedUser.city.latitude * Math.PI / 180;
				//this.rotation.x = (this.rotation.x)%(2*Math.PI);
				this.distanceTarget = 400;
			}
		}
	},
	onMouseDown : function(event) {
		event.preventDefault();
		this.rotationAuto = false;
//		var that = this;
//		clearTimeout(this.timerBeforeRotationAuto);
//		this.timerBeforeRotationAuto = setTimeout(function(){that.rotationAuto = true;}, 30000);
		
		this.mouseUp = true;
		this.mouseOnDown.x = -event.clientX;
		this.mouseOnDown.y = event.clientY;

		this.targetOnDown.x = this.target.x;
		this.targetOnDown.y = this.target.y;

		this.container.style.cursor = 'move';
	},
	onMouseMove : function(event) {
		if (this.mouseUp) {
			this.mouse.x = -event.clientX;
			this.mouse.y = event.clientY;

			var zoomDamp = this.distance / 1000;

			this.target.x = this.targetOnDown.x + (this.mouse.x - this.mouseOnDown.x) * 0.005 * zoomDamp;
			this.target.y = this.targetOnDown.y + (this.mouse.y - this.mouseOnDown.y) * 0.005 * zoomDamp;

			this.target.y = this.target.y > PI_HALF ? PI_HALF : this.target.y;
			this.target.y = this.target.y < -PI_HALF ? -PI_HALF : this.target.y;
		}
	},
	onMouseUp : function(event) {
		this.mouseUp = false;
		this.container.style.cursor = 'auto';
	},
	onMouseOut : function(event) {
		this.mouseUp = false;
	},
	onMouseWheel : function(event) {
		if ('wheelDelta' in event) {
			rolled = event.wheelDelta;// event.wheelDeltaY;//
		} else {
			rolled = -40 * event.detail;
		}
		event.preventDefault();
		if (this.overRenderer) {
			this.zoom(rolled * 0.3);
		}
		return false;
	},
	onDocumentKeyDown : function(event) {
		switch (event.keyCode) {
		case 38:
			this.zoom(100);
			event.preventDefault();
			break;
		case 40:
			this.zoom(-100);
			event.preventDefault();
			break;
		}
	},
	onWindowResize : function(event) {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	},
	zoom : function(delta) {
		this.distanceTarget -= delta;
		this.distanceTarget = this.distanceTarget > 1000 ? 1000 : this.distanceTarget;
		this.distanceTarget = this.distanceTarget < 350 ? 350 : this.distanceTarget;
	},
	animate : function() {
		var that = this;
		var animation = function() {
			requestAnimationFrame(animation);
			that.render();
		};
		animation();
	},
	render : function() {
		this.zoom(this.curZoomSpeed);
		
		if(this.rotationAuto) {
			this.rotation.x -= 0.001;
		}
		else {
			this.rotation.x += (this.target.x - this.rotation.x) * 0.1;
			this.rotation.y += (this.target.y - this.rotation.y) * 0.1;
		}
				
		this.distance += (this.distanceTarget - this.distance) * 0.1;

		this.camera.position.x = this.distance * Math.sin(this.rotation.x) * Math.cos(this.rotation.y);
		this.camera.position.y = this.distance * Math.sin(this.rotation.y);
		this.camera.position.z = this.distance * Math.cos(this.rotation.x) * Math.cos(this.rotation.y);

		var deg = {
			x : this.rotation.x * 360 / Math.PI / 2,
			y : this.rotation.y * 360 / Math.PI / 2,
			z : 0
		};

		for ( var i = 0; i < this.cities.length; i++) {
			for ( var j = 0; j < this.cities[i].users.length; j++) {
				v = new THREE.Vector3(-deg.y * 2 + this.cities[i].latitude * 2, deg.x * 2 + 90 * 2 - this.cities[i].longitude * 2, 0);
				var quaternion = new THREE.Quaternion();
				quaternion.setFromEuler(v);
				this.cities[i].users[j].userObject3d.quaternion = quaternion;
			}
		}

		this.renderer.clear();
		this.renderer.render(this.scene, this.camera);
	}
});
