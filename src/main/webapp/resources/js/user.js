var User = new Class({
	Implements: [Options],
	options: {
	},
	userObject3d: null,
	city: null,
	profile: null,
	initialize: function(profile, options){
		this.setOptions(options);
		this.profile = profile;
		this.userObject3d = new THREE.Mesh(
			new THREE.PlaneGeometry( 140/40, 185/40),
			new THREE.MeshLambertMaterial( {
				/*shading: THREE.SmoothShading,*/
				map: THREE.ImageUtils.loadTexture( profile.imageUrl )
				})
			);
		this.userObject3d.useQuaternion  = true;
		THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB( this.userObject3d ) );
	}
});