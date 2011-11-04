var Stars = new Class({
	Implements: [Options],
	options: {
		textureUrl: "./resources/images/particle.png",
		starDistanceMax: 5500,
		starDistanceMin: 1500,
		particleCount: 1800
	},
	particleSystem: null,
	initialize: function(x, y, z, options){
		// create the particle variables
		var particles = new THREE.Geometry();
		var pMaterial = new THREE.ParticleBasicMaterial({
			color : 0xFFFFFF,
			size : 50,
			map : THREE.ImageUtils.loadTexture(this.options.textureUrl),
			blending : THREE.AdditiveBlending,
			transparent : true
		});
		// nowcreate the individual particles
		for ( var p = 0; p < this.options.particleCount; p++) {
			var distance = Math.random() * (this.options.starDistanceMax-this.options.starDistanceMin) + this.options.starDistanceMin;
			var v = GB.geoUtils.getVector3D(Math.random()*360, Math.random()*360, distance);
			var particle = new THREE.Vertex(v);
			particles.vertices.push(particle);
		} 
		//milkyway... ou pas ^^
		/*
		for ( var p = 0; p < this.options.particleCount; p++) {
			var distance = Math.random() * (this.options.starDistanceMax-this.options.starDistanceMin-1000) + this.options.starDistanceMin;
			var v = GB.geoUtils.getVector3D(Math.random()*360, Math.random()*360, distance*3);
			v.x = Math.random()*200 -100 ;
			if(Math.sqrt(v.x*v.x+v.y*v.y+v.z*v.z)>1000) {
				var particle = new THREE.Vertex(v);
				particles.vertices.push(particle);
			}
		} */
		// create the particle system
		this.particleSystem = new THREE.ParticleSystem(particles, pMaterial);
		//remove a bug with alpha value.
		this.particleSystem.sortParticles = true; 
	}
});