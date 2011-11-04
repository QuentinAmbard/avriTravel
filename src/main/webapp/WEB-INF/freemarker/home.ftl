<#include "/header.ftl"/>

<header id="header" style="opacity:0"> 
	<form id="inputSearch">
		<input type="text" id="inputName" title="Firstname/Lastname" class="field"/> 
		<input type="text"  id="inputCompany" title="Company" class="field"/> 
		<!--<input type="text" id="inputJob" title="Job" class="field"/>--> 
		<input type="submit" id="search" value="GeoSearch" class="searchButton callToaction"/>
		<div id="loader" style="color: #ececec"><img style="float:left" src="./resources/images/loader.gif"/><div style="margin: 2px 0px 0px 3px; width: 200px">Geocoding in progress.<br/> please wait...</div></div>
	</form>
</header> 

<div id="connect"> 
	<h1>geoViadeo</h1> 
	<p> Explore the world, show your connections and discover new ones...<br />
	AvriGeo provides an efficient way to visualize and understand your social networks.<br />
	Play with the planet and discover how your own web is woven.</p> 
	<div style="float:right;padding:10px;padding-right:30px;">
		<input id="start3d" type="submit" value="Start3D" class="Start3D callToaction"/><br /> 
		(Requires a Viadeo account)
	</div>
	<br />
	<div style="margin-top: 50px">
	<p>AvriGeo 3D requires a recent browser with OpenGL enabled. <a href="http://www.khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" target="_blank">?</a></p>
	</div>
	<div id="video" style="text-align: center; margin-top: 10px">
	</div>
</div> 
  <script type="text/javascript">
  if(!Detector.webgl){
	      $$("body").setStyle("background", "url(./resources/images/fond.jpg) center center no-repeat, url(./resources/images/stars.jpg) ");
	      $('connect').setStyle('height', 520);
	      $('start3d').setAttribute("value","3D not avaible");
	      $('start3d').addEvent("submit", function () {return false;});
	      $('video').set('html', '<strong>Sorry, your browser doesn\'t support WebGL. A 2D version is planned. Meanwhile, you can watch AvriGeo in action :</strong><br /> <iframe width="300" height="182" src="http://www.youtube.com/embed/g0i80Mwob2U" frameborder="0" allowfullscreen></iframe>');
  }

  window.addEventListener('resize', function () {
  	$('footer').setStyle('bottom', 0);
  	$('hackFb').setStyle('bottom', 4);
  }, false);
   window.addEvent('domready', function() {
	    if(Detector.webgl){
		   var viadeo = new Viadeo();
		   GB.viadeo = viadeo;
	    	var geoViadeo = new GeoViadeo('container');
	    	GB.geoViadeo = geoViadeo;
	    	geoViadeo.start();
			viadeo.addEvents( {
				"clickOnProfile": function (profile) {
					geoViadeo.me = null;
					viadeo.geoCodeProfile("me", profile);
					viadeo.getContacts(profile.id);
				},
				"profilesLoaded": function (profiles) {
					geoViadeo.displayProfiles(profiles);
				},
				"profileLoaded": function (userId, profile) {
					geoViadeo.displayProfile(userId, profile);
				},
				"loading": function () {
					geoViadeo.displayLoader();
				},
				"loaded": function () {
					geoViadeo.hideLoader();
				}, 
				"contactError": function (error) {
					var b = new TinyAlert({skin:'gray', 'delay': 5000});
					b.show("Geolocation error.", error);
				}
			});
			$('inputSearch').addEvent('submit', function () {
				try {
					viadeo.search();
				}catch(e) {
					console.log(e);
				}
				return false ;
			});
	    }
    });
    $$('.field').each(function (el) {
    	el.set('value', el.get('title'));
    	el.addEvent('click', function () {
    		if(el.get('value') == el.get('title')) {
    			el.set('value', '');
    		}
    	});
    });
    
    window.setTimeout(function() {
	    $('footerEl').fade(0.6);
	}, 5000);
    
  </script>
  <div id="infoSearch"></div>
  <div id="rightPanel">
  <div id="hideRightPanel">&nbsp;</div>
  <div id="social">
  	<span>Exploring <span id="meName"></span>'s connections.</span>
    <h2 id="cityName"> </h2>
    <span id="lat"> </span>
    <span id="lon"> </span>
    <span id="contactNumber"> </span>
        <ul id="contactList">
        </ul>
    </div>
    </div>
<#include "/footer.ftl"/>