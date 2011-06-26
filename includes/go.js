window.whichone = 0;
window.cycleduration = parseInt($("#cycleduration").val());
window.refreshduration = parseInt($("#refreshduration").val());
window.fired = 0;

$(document).ready(function(){
	if (window.fired == 0) {
		window.fired = 1;
		$("#nojs").hide();
	 	$("#nav_links a").live("dblclick", function(event){
			window.location = $(this).attr("href");
			return false;
		});
	 	$("#nav_links a").live("click", function(event){
	 		$("#nav_links a").removeClass("current");
	 		$(this).addClass("current");
	 		window.whichone = $(this).attr("rel");
			$('html, body').stop().animate({scrollTop: $("#"+$(this).attr("rel")).offset().top}, 1000);
			return false;
		});
		$("#nav_options a").click(function(event){
			$(this).toggleClass("on");
			var rel = $(this).attr("rel");
			if (rel == "cycle") {
				if ($(this).hasClass("on")) {
					SetCycleDuration();
					$("#timerbar").fadeIn();
				} else {
					$("#timerbar").fadeOut();
					clearInterval(window.cycletimer);
				}
			}
			if (rel == "refresh") {
				if ($(this).hasClass("on")) {
					SetRefreshDuration();
				} else {
					clearInterval(window.refreshtimer);
				}
			}
			if ($(this).attr("rel") == "gradient") {
				if ($(this).hasClass("on")) {
					$("#gradient").fadeIn(500);
				} else {
					$("#gradient").fadeOut(500);
				}
			}
			return false;
		});
		$("#veil").mousemove(function() {
			slidenav();
		});
		$("#nav").mousemove(function() {
			if (typeof(window['navtimer']) != "undefined") {
				clearTimeout(navtimer);
			}
		});
		$("select").change(function() {
			var rel = $(this).attr("id");
			if (rel == "cycleduration") {
				SetCycleDuration();
			}
			if (rel == "refreshduration") {
				SetRefreshDuration();
			}
		});
		$(".updown").click(function(event){
			var rel = $(this).attr("rel");
			if ($("#"+rel).is(":visible")) {
				$("#"+rel).slideUp();
				$(this).removeClass("open");
			} else {
				$("#"+rel).slideDown();
				$(this).addClass("open");
			}
			return false;
		});
		$(window).bind("keydown", function (e) {
			key = e.which;
			if (window.holdon != 1) {
				if ((key == 37) || (key == 38)) {
					window.whichone--;
					if (window.whichone < 0) {
						window.whichone = $("#nav_links a").size()-1;
					}
					$("#nav_links a:eq("+window.whichone+")").click();
					holdon = 1;
					setTimeout("holdon = 0;", 250);
					return false;
				}
				if ((key == 39) || (key == 40)) {
					window.whichone++;
					if (window.whichone > $("#nav_links a").size()-1) {
						window.whichone = 0;
					}
					$("#nav_links a:eq("+window.whichone+")").click();
					holdon = 1;
					setTimeout("holdon = 0;", 250);
					return false;
				}
			}
		});
		MakePanels();
		OptionCheck();
	}
});

function SetCycleDuration() {
	window.cycleduration = parseInt($("#cycleduration").val());
	if ($("#nav_options_cycle").hasClass("on")) {
		clearInterval(window.cycletimer);
		window.cycletimer = setInterval("cycle()", window.cycleduration);
		cycle();
	}
}

function SetRefreshDuration() {
	window.refreshduration = parseInt($("#refreshduration").val());
	if ($("#nav_options_refresh").hasClass("on")) {
		clearInterval(window.refreshtimer);
		window.refreshtimer = setInterval("refresher()", window.refreshduration);
		refresher();
	}
}

function MakePanels() {
	$("#nav_links a").each(function(i, val) {
//		varslug = slug($(this).html());
		$("body").append("<iframe src='" + $(this).attr("href") + "' id='" + i + "' class='loading' onload='iFrameLoaded("+ i +")' scrolling='no'></iframe>");
//		$(this).attr("href","#" + i); // .attr("href","#"+varslug)
		$("#" + i).css("top", (i*100) + "%");
	});
}

function iFrameLoaded(i) {
	$("#"+i).removeClass("loading").removeAttr("onload");
	$("#loading p").html(Math.round(($("iframe").size() - $(".loading").size()) / $("iframe").size() * 100));
	if ($(".loading").size() == 0) {
		$("#loading").fadeOut();
		$("#nav_links a:eq(0)").click();
	}
}

function MakeURL() {
	var url = "";
	var concatenator = "?"
	$(".nav_option").each(function(i,val) {
		url = url + concatenator + $(this).attr("rel") + "=" + $(this).hasClass("on");
		concatenator = "&";
	});
	return url + window.location.hash;
}

function OptionCheck() {
	$(".nav_option").each(function(i,val) {
		if (get($(this).attr("rel")) == "true") {
			$(this).click();
		}
	});
}

function slidenav() {
	if (!($("#nav").hasClass("open"))) {
		$("#nav").addClass("open").animate({left:"-10px"},500);
	}
	if (typeof(window['navtimer']) != "undefined") {
		clearTimeout(navtimer);
	}
	navtimer = setTimeout("$('#nav').removeClass('open').animate({left:'"+($("#nav").width()*-1-44)+"px'},500)", 2000);
}

function cycle() {
	if ($("#nav_options_cycle").hasClass("on")) {
		progresswhichone();
//		$("#black").fadeIn(500, function() {
			$("#nav_links a:eq("+window.whichone+")").click();
			$("#timerbar_progress").stop().width(0).animate({"width": "100%"}, window.cycleduration);
//		}).fadeOut(500);
	} else {
		clearInterval(cycletimer);
	}
}

function refresher() {
	if ($("#nav_options_refresh").hasClass("on")) {
		$("iframe").each(function(i, val) {
			$(this).attr("src", $(this).attr("src"));
		});
	} else {
		clearInterval(refreshtimer);
	}
}

function progresswhichone() {
	currentone = window.whichone;
	if ($("#nav_options_random").hasClass("on")) {
		//alert("randomizing!");
		while (window.whichone == currentone) {
			window.whichone = Math.floor(Math.random()*($("#nav_links a").size()));
		}
	} else {		
		window.whichone++;
		if (window.whichone > ($("#nav_links a").size()-1)) { window.whichone = 0 };
	}
}

// http://dense13.com/blog/2009/05/03/converting-string-to-slug-javascript/
function slug(str){str=str.replace(/^\s+|\s+$/g,'');str=str.toLowerCase();var from="àáäâèéëêìíïîòóöôùúüûñç·/_,:;";var to="aaaaeeeeiiiioooouuuunc------";for(var i=0,l=from.length;i<l;i++){str=str.replace(from[i],to[i])}str=str.replace(/[^a-z0-9 -]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');return str}

// http://gsgd.co.uk/sandbox/jquery/easing/
jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def: 'easeOutQuad',swing: function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad: function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad: function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad: function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic: function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic: function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic: function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart: function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart: function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart: function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint: function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint: function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint: function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine: function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine: function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine: function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo: function(x,t,b,c,d){return(t==0)?b : c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo: function(x,t,b,c,d){return(t==d)?b+c : c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo: function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc: function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc: function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc: function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic: function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic: function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic: function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack: function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack: function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack: function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce: function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce: function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce: function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});