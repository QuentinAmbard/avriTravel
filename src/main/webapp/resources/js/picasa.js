  
  function checkToken ( )
	{
		var jsonRequest = new Request.JSON({url: './server/redirect/test', 
			headers:{'Content-type':'application/json'},
			urlEncoded: false,
			method: 'get',
			onSuccess: function(registered){
				if(registered.isRegistered){
					hidePopUp();
//					getAlbums();
				}else {
					console.log("Not Yet");
					setTimeout("checkToken()", 2000);
				}
			}
		}).send();
	}	    
  
  function getAlbums ( )
	{
	  var jsonRequest = new Request.JSON({url: './server/picasa/albums', 
			headers:{'Content-type':'application/json'},
			urlEncoded: false,
			method: 'get',
			onSuccess: function(text){
				console.log(text);
			}
		}).send();
	}	  
  
  function hidePopUp ( )
	{
	  	$('connect').fade().get('tween').chain(function () {
		  $('connect').setStyle('display', 'none');
		  });
//		  this.fireEvent('logged');

	}