$(document).ready(function(){
	$("#ul").sortable({ items: ".item", handle: "a.move", axis: "y", placeholder: ".placeholder" });
 	$("#add").click(function(event){
		$("#ul").append($("#blank").html());
		$("#ul").find("li:last").slideDown(500, function(event) {
			$("#ul").sortable("refresh");
		});
		return false;
	})
	$( "#ul" ).bind( "sortupdate", function(event, ui) {
		MakeURL();
	});
	if ($("li.visible").size() == 0) {
		$("#add").click();
	}
 	$(".remove").live("click", function(event){
 		if ($("#ul li").size() > 1) {
	 		var obj = $(this).parent();
			obj.animate({"opacity": 0, "height": 0},500, function() {
				obj.remove();
				MakeURL();
			});
		}
		return false;
	});
 	$(".move").live("click", function(event){
		return false;
	});
 	$(".textinput").live("focus", function(event){
		if (($(this).val() == "URL") || ($(this).val() == "Title")) {
	 		$(this).select();
	 	}
 	});
 	$(".textinput").live("blur", function(event){
		if (($(this).val() == "") && ($(this).hasClass("url"))) {
	 		$(this).val("URL").addClass("default");
	 	}
		if (($(this).val() == "") && ($(this).hasClass("title"))) {
	 		$(this).val("Title").addClass("default");
	 	}
 	});
 	$(".textinput").live("keyup change", function(event){
		if (($(this).val() == "URL") || ($(this).val() == "Title")) {
			$(this).addClass("default");
		} else {
			$(this).removeClass("default");
		}
 		MakeURL();
	}).change();
});

function MakeURL() {
	var u = "";
	var t = "";
	var ts = ""
	var concatenator = ""
	$("#ul li").each(function(i,val) {
		$(this).find(".url").removeClass("invalid");
		var varUrl = $(this).find(".url").val();
		var varTitle = $(this).find(".title").val();
		if (varUrl == "URL") { varUrl = ""; }
		if (varTitle == "Title") { varTitle = ""; }
		if (varTitle == "") {
			if (varUrl.charAt(varUrl.length-1) == "/") {
				varUrl = varUrl.slice(0, -1);
			}
			varTitle = varUrl.substring(varUrl.lastIndexOf('/')+1);
		}
		if (varUrl > "") {
			if (!isUrl(varUrl)) {
				$(this).find(".url").addClass("invalid");
			}
			u = u + concatenator + encodeURIComponent(varUrl); // escape
			t = t + concatenator + escape(varTitle);
			ts = ts + varTitle + " / ";
			concatenator = ",";
		}
		CheckValids();
	});
	finalurl = 	"http://sitecycler.com/?u=" + u + "&t=" + t;
	$("a.finalurl").attr("href",finalurl).html("SiteCycler - " + ts.slice(0, -3));
	$("textarea.finalurl").val(finalurl);
	if (ts !== "") {
		$("p.finalurl").slideDown();
	} else {
		$("p.finalurl").slideUp();
	}
}

function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
}

function CheckValids() {
	if ($(".invalid").size() > 0) {
		$("#validate").stop().animate({"opacity": 1},500);
	} else {
		$("#validate").stop().animate({"opacity": 0},500);
	}
}
