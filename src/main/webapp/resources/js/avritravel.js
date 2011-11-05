var PI_HALF = Math.PI / 2;
var GeoTravel = new Class({
	Implements : [ Options, Events ],
	options : {
		globeImageUrl : 'resources/images/',
		radius : 200
	},
	me : null,
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
	moveLinear: false,
	photoHelper: null,
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
		/*
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
		}); */
		this.container.addEventListener('mousedown', this.onMouseDown.bind(this), false);
		this.container.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
		this.container.addEventListener('DOMMouseScroll', this.onMouseWheel.bind(this), false);
		document.addEventListener('keydown', this.onDocumentKeyDown.bind(this), false);
		window.addEventListener('resize', this.onWindowResize.bind(this), false);
		this.container.addEventListener('mousemove', this.onMouseMove.bind(this), false);
		this.container.addEventListener('mouseup', this.onMouseUp.bind(this), false);
		this.container.addEventListener('mouseout', this.onMouseOut.bind(this), false);
		
		this.container.addEventListener('mouseover', function() {
			that.overRenderer = true;
		}, false);
		this.container.addEventListener('mouseout', function() {
			that.overRenderer = false;
		}, false);

		var stars = new Stars();
		this.scene.addChild(stars.particleSystem);
		
		this.scene.addObject(GB.geoUtils.getLine([new THREE.Vector3( 0,0,0 ),new THREE.Vector3( 300,0,0 )], 0xFF0000));
		this.scene.addObject(GB.geoUtils.getLine([new THREE.Vector3( 0,0,0 ),new THREE.Vector3( 0,300,0 )], 0x00FF00));
		this.scene.addObject(GB.geoUtils.getLine([new THREE.Vector3( 0,0,0 ),new THREE.Vector3( 0,0,300 )], 0x8888FF));
		//// TESTTTTTTTTTT
		
		var locs = [40.71435, 	-74.00597,48.85661, 	2.35222,-33.87365, 	151.20689,-37.81319, 	144.96298,-14.23500, 	-51.92528,-43.53205, 	172.63623];
		
		this.photoHelper = new PhotoHelper(this);
		var that=this;
		for(var i=0; i< locs.length;i+=2){
			(function(a, b, i){
			setTimeout(function(){
				that.photoHelper.displayNextPhoto(a, b, '#');
			}, 4000*i);
			})(locs[i], 	locs[i+1], i);
		}
		
//		var that = this;
//		setTimeout(function(){that.photoHelper.photos[1].showPhoto()}, 3000);
//		setTimeout(function(){that.photoHelper.photos[0].showPhoto()}, 5000);
//		
		//// TESTTTTTTTTTT
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
	onMouseDown : function(event) {
		event.preventDefault();
		this.rotationAuto = false;

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
	setGlobePosition : function(lat, lng) {
		//this.target.x = (lng - 90 + 360) * Math.PI / 180 + Math.floor(this.rotation.x/(2*Math.PI))*2*Math.PI;
		//this.target.y = lat * Math.PI / 180;
		this.target.x = (lng-90) * Math.PI / 180;
		this.target.y = lat * Math.PI / 180;
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
		this.distanceTarget = this.distanceTarget < 250 ? 250 : this.distanceTarget;
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
		
		if (this.moveLinear) {
			if(this.distanceTarget>this.distance){
				this.distance += 2;
			} else {
				this.distance -= 2;
			}
		} else {
			this.distance += (this.distanceTarget - this.distance) * 0.1;
		}
		
		/*if (this.rotationAuto) {
			this.rotation.x -= 0.001;
		} else*/ {
			this.rotation.x += (this.target.x - this.rotation.x) * 0.1;
			this.rotation.y += (this.target.y - this.rotation.y) * 0.1;
		}

		this.camera.position.x = this.distance * Math.sin(this.rotation.x) * Math.cos(this.rotation.y);
		this.camera.position.y = this.distance * Math.sin(this.rotation.y);
		this.camera.position.z = this.distance * Math.cos(this.rotation.x) * Math.cos(this.rotation.y);

		var deg = {
			x : this.rotation.x * 360 / Math.PI / 2,
			y : this.rotation.y * 360 / Math.PI / 2,
			z : 0
		};
		
		var deg = {
				x : this.rotation.x * 360 / Math.PI / 2,
				y : this.rotation.y * 360 / Math.PI / 2,
				z : 0
			};

		for ( var j = 0; j < this.photoHelper.photos.length; j++) {
			var photo = this.photoHelper.photos[j];
//			v = new THREE.Vector3(-deg.y * 2 + photo.lat * 2, deg.x * 2 + 90 * 2 - photo.lng * 2, 0);
//			var quaternion = new THREE.Quaternion();
//			quaternion.setFromEuler(v);
//			photo.pictureObject3d.quaternion = quaternion;
			v = new THREE.Vector3(-deg.y * 2 , deg.x * 2, 0);
			var quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(v);
			photo.photoObject3d.quaternion = quaternion;
		}

		this.renderer.clear();
		this.renderer.render(this.scene, this.camera);
		
		
	}
});
