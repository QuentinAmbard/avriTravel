var Shaders = {
    'earth' : {
      uniforms: {
        'texture': { type: 't', value: 0, texture: null }
      },
      vertexShader: [
        'varying vec3 vNormal;',
        'varying vec2 vUv;',
        'void main() {',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
          'vNormal = normalize( normalMatrix * normal );',
          'vUv = uv;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'uniform sampler2D texture;',
        'varying vec3 vNormal;',
        'varying vec2 vUv;',
        'void main() {',
          'vec3 diffuse = texture2D( texture, vUv ).xyz;',
          'float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
          'vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );',
          'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );',
        '}'
      ].join('\n')
    },
    'atmosphere' : {
      uniforms: {},
      vertexShader: [
        'varying vec3 vNormal;',
        'void main() {',
          'vNormal = normalize( normalMatrix * normal );',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 vNormal;',
        'void main() {',
          'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
          'gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * (intensity);',
        '}'
      ].join('\n')
    }
  };

var GeoUtils = new Class({
	Implements : [ Options ],
	options : {
		delta : 1,
		precision : 3,
		radius: 200
	},
	radius : null,
	initialize : function(options) {
		this.setOptions(options);
		this.radius = this.options.radius + this.options.delta;
	},
	/**
	 * Returns N points interpolated around the sphere, given 2 points p1, p2. N
	 * function of options.precision.
	 */
	getInterpolatedVector : function(v1, v2, radius) {
		radius = radius || this.radius ;
		var distance = Math.sqrt(Math.pow((v1.x - v2.x) , 2) + Math.pow((v1.y - v2.y) , 2) + Math.pow((v1.z - v2.z) , 2));
		var precision = Math.min(3,Math.floor(distance/50))+this.options.precision;
		vectors=[v1,v2];
		for ( var k = 0; k < precision; k++) {
			for ( var i = 1; i < vectors.length; i++) {
				var p1 = vectors[i - 1];
				var p2 = vectors[i];
				var newPoint = this.getMiddlePointOnSphere(p1, p2, radius);

				var currentLength = vectors.length;
				for ( var j = currentLength - 1; j >= i; j--) {
					vectors[j + 1] = vectors[j];
				}
				vectors[i] = newPoint;
				i++;
			}
		}
		return vectors;
	},
	/**
	 * Return a median point on the sphere.
	 */
	getMiddlePointOnSphere : function(p1, p2, radius) {
		radius = radius || this.radius ;
		var distance = Math.sqrt(Math.pow((p1.x + p2.x) / 2, 2) + Math.pow((p1.y + p2.y) / 2, 2) + Math.pow((p1.z + p2.z) / 2, 2));
		var x = radius * ((p1.x + p2.x) / 2) / distance;
		var y = radius * ((p1.y + p2.y) / 2) / distance;
		var z = radius * ((p1.z + p2.z) / 2) / distance;
		return new THREE.Vector3(x, y, z);
	},
	/**
	 * Return a vector 3D given a lat and long.
	 */
	getVector3D : function(lat, long, radius) {
		radius = radius || this.radius ;
		var phi = (90 - lat) * Math.PI / 180;
		var theta = (180 - long) * Math.PI / 180;
		var x = radius * Math.sin(phi) * Math.cos(theta);
		var y = radius * Math.cos(phi);
		var z = radius * Math.sin(phi) * Math.sin(theta);
		return new THREE.Vector3(x, y, z);
	},
	
	geGeoFromVector3D : function(vector, radius) {
		radius = radius || this.radius ;
		var x = vector.x;
		var y = vector.y;
		var z = vector.z;
		
		var phi = Math.acos(y / radius);
		var theta = Math.acos(x / radius / Math.sin(phi));
		//var theta = Math.asin(z / radius / Math.sin(phi));
		
		var lat = -( phi / (Math.PI / 180) - 90 );
		var lng = -( theta / (Math.PI / 180) -180 );
		
		if(x < 0) {
			lng *=-1;
		}
		
		return [lat, lng];
	},
	/**
	 * Return a THREE.Line following the given points.
	 */
	getLine : function(points, color) {

		var geometry = new THREE.Geometry();
		var colors = [];
		var position;

		for (i = 0; i < points.length; i++) {
			position = points[i];
			geometry.vertices[i] = new THREE.Vertex(new THREE.Vector3(position.x, position.y, position.z));
			colors[i] = new THREE.Color(color);
		}

		geometry.colors = colors;

		// lines
		material = new THREE.LineBasicMaterial({
			color : 0xffffff,
			opacity : 1,
			linewidth : 1
		});
		material.vertexColors = true;

		var line = new THREE.Line(geometry, material);
		line.scale.x = line.scale.y = line.scale.z = 1;
		line.position.x = 0;
		line.position.y = 0;
		line.position.z = 0;
		return line;
	},
	convertGeolocMinSec: function(loc) {
		var a = Math.floor(loc);
		var temp = (loc - a) * 60;
		var b = Math.floor(temp);
		var c = Math.floor((temp-b) * 60);
		return [a,b,c];
	}
});
var GB = GB || {};
GB.geoUtils = new GeoUtils();
