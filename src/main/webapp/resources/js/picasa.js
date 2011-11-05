  
  function checkToken ( )
	{
		var jsonRequest = new Request.JSON({url: './server/redirect/test', 
			headers:{'Content-type':'application/json'},
			urlEncoded: false,
			onSuccess: function(registered){
				if(registered.isRegistered){
					console.log("OK");
				}else {
					console.log("Not Yet");
					setTimeout("checkToken()", 2000);
				}
			}
		}).send();
	}	    