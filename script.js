// JavaScript Document
$(document).ready(function() {
	
	'use strict';
	
	$('body').append('<div></div>').children().attr('class','container').css({'border':'black solid thin',
																			  'width':'800px',
																			  'height':'600px'});
	$('body').append('<input type="button" name="button" class="button">');
	
	var initialBallSize= 20;
	var balls = [];
	var noOfBalls = 10;
	var interval;
	var momentumCoefficient = 1;
	
	
	for(var i=0;i<noOfBalls;i++){	
		
	balls[i] = new ball(initialBallSize,'red',
						Math.round(initialBallSize+Math.random()*750),
						Math.round(initialBallSize+Math.random()*550),
						i); //create a new ball object
		
	//mechanism to detech clashes//

	};
	
	var interval = setInterval(move,5);
	
	
	function move(){
			
		for(var i=0;i<noOfBalls;i++){	

			//clash detection
			
			for(var j=0;j<noOfBalls;j++){
				
				if(j != i){ 
					var distance = Math.sqrt(Math.pow(balls[i].Coord[0]-balls[j].Coord[0],2)+
											 Math.pow(balls[i].Coord[1]-balls[j].Coord[1],2));
				
					if(distance < (initialBallSize+5)){

						//logic incomplete//
						
						if((balls[i].vel[0]>=0 && balls[j].vel[0] <=0) || (balls[i].vel[0]<=0 && balls[j].vel[0] >=0) ){ //opposite X direction
							balls[i].vel[0] = -balls[i].vel[0];

							balls[j].vel[0] = -balls[j].vel[0];

						}
						if((balls[i].vel[1]>=0 && balls[j].vel[1] <=0) || (balls[i].vel[0]<=0 && balls[j].vel[0] >=0) ){

							balls[i].vel[1] = -balls[i].vel[1];

							balls[j].vel[1] = -balls[j].vel[1];

						}
										
					
					}
				
			}

		} //end for j
			
			var previousLeft = parseInt($('#'+balls[i].ballID).css('left')); 
			var previousTop = parseInt($('#'+balls[i].ballID).css('top')); 
			
			var newLeft = previousLeft +balls[i].vel[0];
			var newTop = previousTop +balls[i].vel[1];
			
			$('#'+balls[i].ballID).css({'left':newLeft,'top':newTop});
						
			balls[i].Coord[0] = newLeft;
			balls[i].Coord[1] = newTop;
			
			if(newLeft <= 0 || newLeft >=750){ //left & right walls//
				
				balls[i].vel[0] = -balls[i].vel[0];		
			
			}
			if(newTop <= 0 || newTop >= 550){

				balls[i].vel[1] = -balls[i].vel[1];
					
			}

		
		
		} //end for i
	
	}
	
	
	
	function ball(size,colour,x,y, index){ //ball object constructor
		
		this.ballSize = this.size;
		this.ballColour = this.colour;
		this.Coord = [x, y];
		
		this.vel=[2,2];
		//this.vel = [Math.round(2*Math.random())+1, Math.round(2*Math.random())+1]; //x, y (opposite to convention so it is consistent with CSS)
		
		this.KE = [0,0];
		
		this.ballID = "B"+index;
		
		$('.container').append("<div></div>").children().eq(i).css({'background-color': colour,
													   	'left': x,
													   	'top': y,
													   	'width':size,
													   	'height':size,
													    'border-radius':(size/2)}) .addClass('BALLS').attr('id',"B"+index);
		
	}
	
	$('.button').click(function(){
		
		clearInterval(interval);
		
	})
	
	
	//COOKIE FUNCTIONS DO NOT TOUCH//
	function setCookie(cookieName,value,exdays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var  cookieValue=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=cookieName + "=" + cookieValue;
	}
	
	function doesCookieExist(cookieName) {
		var value=getCookie(cookieName);
		if (value!=null && value!="") {
			return true;
		} else {
			return false;
		}
	}
	
	function getCookieValue(cookieName) {
		var value=getCookie(cookieName);
		if (value!=null && value!="") {
			return value.split(",")[0];
		} else {
			return null;
		}
	}
	
	function deleteCookie(cookieName) {
		setCookie(cookieName, "", -1);	
	}
	
	function getCookie(cookieName) {
		var cookie = document.cookie;
		var c_start = cookie.indexOf(" " + cookieName + "=");
		if (c_start == -1) {
			c_start = cookie.indexOf(cookieName + "=");
		}
		
		if (c_start == -1) {
			cookie = null;
		} else {
			c_start = cookie.indexOf("=", c_start) + 1;
			var c_end = cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = cookie.length;
			}
			cookie = unescape(cookie.substring(c_start,c_end));
		}
		
		return cookie;
	}
	
});

