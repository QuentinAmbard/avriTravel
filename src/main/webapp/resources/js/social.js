var Social = new Class({
	Implements: [Options],
	lastCity: null,
	lastUser: null,
	options: {
	},
	initialize: function(options){
		this.setOptions(options);
	},
	display: function(user){
		var city = user.city;
		if(city != this.lastCity) {
			
			$('cityName').innerHTML = city.name;
			var latTemp = GB.geoUtils.convertGeolocMinSec(city.latitude);
			var lngTemp = GB.geoUtils.convertGeolocMinSec(city.longitude);
			$('lat').innerHTML = 'Lat: '+latTemp[0]+'&deg;N '+latTemp[1]+'\' '+latTemp[2]+'\'\'';
			$('lon').innerHTML = 'Long: '+lngTemp[0]+'&deg;E '+lngTemp[1]+'\' '+lngTemp[2]+'\'\'';
			$('contactNumber').innerHTML = city.users.length+' Contacts';
			
			$('contactList').innerHTML = '';
			
			for(var i=0; i<city.users.length; i++) {
				var li = new Element('li');
				li.id = city.users[i].profile.id;
				
				
				var img = new Element('img', {
				    src: 'http://static2.viadeo-static.com/servlet/photo?type=2&memberId=' + city.users[i].profile.imageId
				});
				if(! city.users[i].profile.has_picture) {
					img.src = 'resources/images/noProfile.gif';
				}
				
				var div = new Element('div', {
				    'class': 'contact'
				});
				
				var name = new Element('span', {
				    'class': 'name'
				});
				
				var title = new Element('span', {
				    'class': 'title'
				});
				
				var contactPicto = new Element('div', {
				    'class': 'contactPicto'
				});
				
				var contactNumber = new Element('span', {
				    'class': 'contactNumber'
				});
				
				var popup = new Element('div', {
				    'class': 'popup'
				});

				name.innerHTML = city.users[i].profile.first_name + ' ' + city.users[i].profile.last_name;
				title.innerHTML = city.users[i].profile.headline;
				contactNumber.innerHTML = city.users[i].profile.contact_count;
				popup.innerHTML = "Click to display "+city.users[i].profile.first_name + " " + city.users[i].profile.last_name+"'s connections.";
				div.appendChild(name);
				div.appendChild(title);
				contactPicto.appendChild(contactNumber);
				contactPicto.appendChild(popup);
				
				li.appendChild(img);
				li.appendChild(div);
				if(city.users[i].profile.distance <= 1) {
					li.appendChild(contactPicto);
				}
				
				$('contactList').appendChild(li);
				
				(function(city, user) {
					li.onclick = function() {
						GB.social.display(user);
					};
				})(city, city.users[i]);
				
				(function(user) {
					contactPicto.onclick = function() {
						GB.geoViadeo.displayProfile('me', user.profile);
						GB.viadeo.getContacts(user.profile.id);
					};
				})(city.users[i]);
				
			}
		}
		
		if(user != this.lastUser) {
			if(this.lastUser != null && this.lastCity == city) {
				this.lastUser.userObject3d.position.z = 40;
				$(this.lastUser.profile.id).setAttribute("class", "");
				$(this.lastUser.profile.id).style.height = '';
			}
			
			if(city.users.length>1) {
				user.userObject3d.position.z = 60;
			}
			
			$(user.profile.id).setAttribute("class", "active");
			$(user.profile.id).style.height = 'auto';
			if(user.profile.introduction != null) {
				var moreInfo = new Element('div', {
				    'style': 'display: block; padding: 5px; clear: both;'
				});
				moreInfo.innerHTML = user.profile.introduction;
				$(user.profile.id).appendChild(moreInfo);
			}

			var myFx = new Fx.Scroll($('contactList')).set(0,$('contactList').scrollTop);
			myFx.start(0, $(user.profile.id).getPosition().y-$('contactList').getPosition().y+$('contactList').scrollTop);
		}
		
		this.lastUser = user;
		this.lastCity = city;
	}
});

var GB = GB || {};
GB.social = new Social();