$(".tommyselect").each(function(i,val) {
	id = $(this).attr("id");
	$(this).hide().after(
		"<span class='tommyselect_new' rel='"+id+"'><a href='#' rel='down'>&lt;</a><span rel='0'>"+$(this).find("option:eq(0)").html()+"</span><a href='#' rel='up'>&gt;</a></span>"
	);
	maxwidth = 0;
	$(this).find("option").each(function(i,val) {
		span = $(".tommyselect_new[rel="+id+"] span");
		span.html($(this).html());
		if (span.width() > maxwidth) { maxwidth = span.width(); }
	});
	span.html($(this).find("option:eq(0)").html());
	span.css("width",maxwidth+"px");
});
$(".tommyselect_new a").click(function() {
	parent = $(this).parent();
	original = $("#"+parent.attr("rel"));
	span = parent.find("span");
	max = original.find("option").size() - 1;
	i = span.attr("rel");
	if ($(this).attr("rel") == "down") {
		i--;
	} else {
		i++;
	}
	if (i < 0) { i = max; }
	if (i > max) { i = 0; }
	span.html(original.find("option:eq("+i+")").html()).attr("rel",i);
	original.find("option:eq("+i+")").attr("selected","true");
	return false;
});
