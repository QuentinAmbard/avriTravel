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

		this.renderer.clear();
		this.renderer.render(this.scene, this.camera);
	}
});
