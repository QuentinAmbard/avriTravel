var Viadeo = new Class({
	Implements: [Options, Events],
	options: {
		key: "connect4dgdfyDS",
		loginId: "start3d"
	},
	scene: null,
	initialize: function(options){
		this.setOptions(options);
		 VD.init({
             apiKey: this.options.key,  
             status: true,  
             cookie: true  
         }); 
		var that = this;
		$(this.options.loginId).addEvent('click', function () { that.login(); });
	},
	login: function () {
		var that = this;
		 VD.getLoginStatus(function(r) {  
             if (!r.session) {  
                 VD.login(function(e) {  
                	 if(e.status =="connected") {
                    	 that.logged();  
                	 }
                 });  
             } else if(r.status =="connected") { 
            	 that.logged();  
             }  
         }); 
	},
	logged: function () {
		$('connect').fade().get('tween').chain(function () {
			$('connect').setStyle('display', 'none');
		});
		$('header').fade(1);
		this.getProfileInfo();
		this.getContacts();
		this.fireEvent('logged');
		GB.geoViadeo.rotationAuto = false ;
	},
	getAddressFromProfile: function (profile) {
		return (profile.location.city+", "+profile.location.country).toLowerCase().clean();
	},
	getProfileInfo: function (userId) {
		userId = userId || "me";
		var that = this;
		VD.api('/'+userId+'?user_detail=full', function(profile) {
			that.geoCodeProfile(userId, profile);
		});
	},
	geoCodeProfile: function (userId, profile) {
		var that = this ;
		profile.address = this.getAddressFromProfile(profile);
		var jsonRequest = new Request.JSON({url: './geocoder/', 
			headers:{'Content-type':'application/json'},
			urlEncoded: false,
			onSuccess: function(latLng){
				profile.location.latitude = latLng[profile.address].lat;
				profile.location.longitude = latLng[profile.address].lng;
				that.fireEvent('profileLoaded', [userId, profile]);
			}
		}).send(JSON.encode([that.getAddressFromProfile(profile)]));
	},
	geoCode: function (profiles) {
		var that = this;
		var profileSorted = [];
		var nbProfile = profiles.length ;
		var localizations = [];
		for(var i=0;i<nbProfile;i++) {
			var profile = profiles[i];
			profile.address = that.getAddressFromProfile(profile);
			if(!localizations.contains(profile.address)) {
				localizations[localizations.length] = profile.address;
			}
		}
		var jsonRequest = new Request.JSON({url: './geocoder/', 
			headers:{'Content-type':'application/json'},
			urlEncoded: false,
			onSuccess: function(latLngs){
				var nbProfile = profiles.length ;
				for(var i=0;i<nbProfile;i++) {
					var profile = profiles[i];
					profile.location.latitude = latLngs[profile.address].lat;
					profile.location.longitude = latLngs[profile.address].lng;
					var size = profileSorted.length ;
					var inserted = false ;
					for(var j=0;j<size;j++) {
						if(profileSorted[j][0].location.latitude == profile.location.longitude && profileSorted[j][0].location.latitude == profile.location.longitude) {
							profileSorted[j].push(profile);
							inserted = true ;
							break;
						}
					}
					if(!inserted) {
						profileSorted.push([profile]);
					}
				}
				profileSorted.sort(function (a, b){return b.length - a.length;});
				that.fireEvent('profilesLoaded', [profileSorted]);
				that.fireEvent("loaded");
				that.searchInProgress = false ;
			}
		}).send(JSON.encode(localizations));
	},
	getContacts: function (userId) {
		if(this.searchInProgress) {
			this.fireEvent("contactError", "A serach is in progress... Please wait during geocoding time...");
		}else {
			this.searchInProgress = true ;
			this.fireEvent("loading");
			var profiles = [];
			userId = userId || "me";
			var that = this;
			VD.api('/'+userId+'/contacts?limit=50&user_detail=full', function(response) {
				if(typeof(response.error) != "undefined") {
					that.fireEvent("contactError", "This user doesn't allow his contacts to be seen.");
					that.fireEvent("loaded");
					that.searchInProgress = false ;
				} else if(typeof(response.data) == "undefined") {
					that.fireEvent("contactError", "This user doesn't share contacts with you.");
					that.fireEvent("loaded");
					that.searchInProgress = false ;
				} else {
					GB.geoViadeo.removeAllCities();
					profiles = profiles.concat(response.data) ;
					var total = response.count ;
					var nbPage = Math.min(Math.ceil(total/50)+1,10);
					if(nbPage>2) {
						for(var i=2;i<nbPage;i++) {
							VD.api('/'+userId+'/contacts?limit=50&user_detail=full&page='+i, function(r) {
								profiles = profiles.concat(r.data) ;
								//console.log("page"+i+" "+r.data.length+" total:"+profiles.length);
								if(profiles.length==total || profiles.length>=450)  {
									that.geoCode(profiles);
								}
							});
						}
					} else {
						that.geoCode(profiles);
					}
				}
			});
		}
	},
	searchResult:[],
	search: function() {
		var name = $('inputName').get('value');
		var company = $('inputCompany').get('value');
		var request = "/search/users?user_detail=partial&limit=40";
		var changed = false ;
		if(name != "" && name != $('inputName').get('title')) {
			request = GB.addParameterToURI(request, "name", name);
			changed = true ;
		}
		if(company != "" && company != $('inputCompany').get('title')) {
			request = GB.addParameterToURI(request, "company", company);
			changed = true ;
		}
		if(changed) {
			this.fireEvent("loading");
			this.hideResults();
			var perColumn = 12;
			var that = this;
			//Add an image in the dom.
			var addImage = function (url, i, width, height) {
				var top = (100+(i-(Math.floor(i/perColumn))*perColumn)*(35+5)) ;
				var img = new Element('div', {
					styles: {
						"backgroundImage": "url("+url+")",
						height: height+"px",
						width: width+"px",
						"box-shadow": "0px 0px 5px #737373",
						position: "absolute",
						top: top+"px",
						left: "-100px",
						cursor: "pointer"
					},
					'tween': {
						duration: 'long',
						transition: 'quad:out'
					}
				});
				img.inject($(document.body));
				
				(function (img, d){
					window.setTimeout(function() {
						img.tween('left', d);
					}, 500);})(img, 5+(25+10)*(Math.floor(i/perColumn)));
				that.searchResult.push(img);
				return img ;
			};
			//Make the viadeo request and display the results.
			VD.api(request, function(response) {
				if(typeof(response.data) != "undefined") {
					var profiles = response.data;
					for(var i =0;i<profiles.length;i++) {
						var img = addImage(profiles[i].picture_small, i, 25, 35);
						(function (profile) {
							img.addEvents({
								'click': function (el) {
									that.fireEvent("clickOnProfile", profile);
								},
								'mouseenter': function (el) {
									$('infoSearch').set('html', GB.textNormalizer(profile.name));
								},
								'mouseleave': function (el) {
									$('infoSearch').set('html', '');
								}
							});
						}) (profiles[i]);
					}
				} else {
					var i = 0;
				}
				//setup the close button
				var close = addImage("./resources/images/close.png", i, 24, 24);
				close.addEvent('click', function(){
					that.hideResults();
				});
				that.fireEvent("loaded");
			});
		}
	}, 
	hideResults: function () {
		for(var i =0;i<this.searchResult.length;i++) {
			var myFx = new Fx.Tween(this.searchResult[i], {
			    duration: 'long',
			    transition: 'quad:out',
			    property: 'left'
			});
			myFx.addEvent('complete', function (el) {
				el.dispose();
			});
			myFx.start(-100);
		}
		this.searchResult = [];
	}
});

               