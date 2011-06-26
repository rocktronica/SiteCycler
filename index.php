<?php include "includes/base.php"; ?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="/style.css" type="text/css" rel="stylesheet" media="screen" />
<title>SiteCycler - <?php echo pagetitle(); ?></title>
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-9757644-6']);
_gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
<link rel="shortcut icon" href="/favicon.ico" />
<meta name="description" content="A Slideshow for Websites" />
<meta name="keywords" content="sitecycler, site, cycler, slideshow, websites, links, webpages, powerpoint, keynote" />
</head>

<?php if ($_GET["p"] == "nostats") { ?>
	<body onLoad="javascript:pageTracker._setVar('test_value');"><p class="absolute">NOSTATS!</p>
<?php } else { ?>
	<body id="page_<?php echo page(); ?>">
<?php } ?>

<?php if (page() !== "go") {
	include "includes/".page().".php";
} else {
	if (HasUT()) {
		if (ValidUT()) {
			include "includes/go.php";	
		} else {
			include "includes/woops.php";
		}
	} else {
		include "includes/front.php";	
	}
} ?>

</body>
</html>