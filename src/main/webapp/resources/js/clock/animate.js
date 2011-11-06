// JavaScript Document

	//initial time
	var h_current = -1;
	var m1_current = -1;
	var m2_current = -1;
	var s1_current = -1;
	var s2_current= -1;

	
	function flip (upperId, lowerId, changeNumber, pathUpper, pathLower){
		var upperBackId = upperId+"Back";
		$(upperId).src = $(upperBackId).src;
		$(upperId).setStyle("height", "64px");
		$(upperId).setStyle("visibility", "visible");
		$(upperBackId).src = pathUpper+parseInt(changeNumber)+".png";
		
		$(lowerId).src = pathLower+parseInt(changeNumber)+".png";
		$(lowerId).setStyle("height", "0px");
		$(lowerId).setStyle("visibility", "visible");
		
		var flipUpper = new Fx.Tween(upperId, {duration: 200, transition: Fx.Transitions.Sine.easeInOut});
		flipUpper.addEvents({
			'complete': function(){
				var flipLower = new Fx.Tween(lowerId, {duration: 200, transition: Fx.Transitions.Sine.easeInOut});
					flipLower.addEvents({
						'complete': function(){	
							lowerBackId = lowerId+"Back";
							$(lowerBackId).src = $(lowerId).src;
							$(lowerId).setStyle("visibility", "hidden");
							$(upperId).setStyle("visibility", "hidden");
						}				});					
					flipLower.start('height', 64);
					
			}
							});
		flipUpper.start('height', 0);/*
		lowerBackId = lowerId+"Back";
		$(lowerBackId).src = $(lowerId).src;
		$(lowerId).setStyle("visibility", "hidden");
		$(upperId).setStyle("visibility", "hidden");*/
		
	}//flip
				
	
	function retroClock(m,d,y){
		console.log(m+","+d+","+y);
		 h = m;
		 m1 = Math.floor(d / 10);
		 m2 = d % 10;
		 s1 = Math.floor((y / 10)) % 10;
		 s2 = y % 10;
		console.log(h+","+m1+"|"+m2+","+s1+"|"+s2);
			
		 ap = "PM";
		 
		 //change pads
		 
		 if( h != h_current){
			flip('hoursUp', 'hoursDown', h, 'resources/images/clock/Single/Up/'+ap+'/', 'resources/images/clock/Single/Down/'+ap+'/');
			h_current = h;
		}
		
		if( m2 != m2_current){
			flip('minutesUpRight', 'minutesDownRight', m2, 'resources/images/clock/Double/Up/Right/', 'resources/images/clock/Double/Down/Right/');
			m2_current = m2;
			
			flip('minutesUpLeft', 'minutesDownLeft', m1, 'resources/images/clock/Double/Up/Left/', 'resources/images/clock/Double/Down/Left/');
			m1_current = m1;
		}
		
		 if (s2 != s2_current){
			flip('secondsUpRight', 'secondsDownRight', s2, 'resources/images/clock/Double/Up/Right/', 'resources/images/clock/Double/Down/Right/');
			s2_current = s2;
			
			flip('secondsUpLeft', 'secondsDownLeft', s1, 'resources/images/clock/Double/Up/Left/', 'resources/images/clock/Double/Down/Left/');
			s1_current = s1;
		}
		
		
		
			
		
	}
	var clockDate = 1320533733000;
	function setClock(date) {
		clockDate = date ;
		var date = new Date(Math.floor(date));
		retroClock(date.getMonth()+1, date.getDate()-1, date.getFullYear());
	}
	
			
	