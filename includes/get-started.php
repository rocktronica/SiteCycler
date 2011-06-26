<?php include "includes/header.php" ?>

<h2><?php 
$split = explode("/", $_SERVER['REQUEST_URI']);
$page = $split[1];
echo ucwords($page);
?></h2>

<p id="validate">Make sure those URLs are valid!</p>

<ul id="ul">
<?php if (ValidUT()) {
	$u = explode(",", $_GET["u"]);
	$t = explode(",", $_GET["t"]);
	foreach ($u as $i => $url) { ?>
		<li class="visible item">
			<label>URL:</label>
			<input type="text" class="textinput url" value="<?php echo $url; ?>" />
			<label>Title:</label>
			<input type="text" class="textinput title" value="<?php echo $t[$i]; ?>" />
		<a href="#" class="remove pictos" alt="Remove"><span></span></a>
		<a href="#" class="move pictos" alt="Move"><span></span></a>
		</li>
	<?php }
} ?>
</ul>

<p><a href="#" class="add pictos" id="add"><span></span>Add Link</a></p>

<h3>Finished SiteCycler Link</h3>
<p>This will change as you type. When you're done, click the link to view your SiteCycler or copy the URL to share it with a friend.</p>
<p class="finalurl hidden">Clickable: <strong><a class="finalurl" href="#"></a></strong></p>
<p><textarea class="finalurl textinput"></textarea></p>

<div class="hidden" id="blank">
	<li class="item">
		<label>URL:</label>
		<input type="text" class="textinput url default" value="URL" />
		<label>Title:</label>
		<input type="text" class="textinput title default" value="Title" />
		<a href="#" class="remove pictos" alt="Remove"><span></span></a>
		<a href="#" class="move pictos" alt="Move"><span></span></a>
	</li>
</div>

<?php include "includes/footer.php" ?>

<script src="http://www.google.com/jsapi" type="text/javascript"></script>
<script type="text/javascript">google.load("jquery", "1"); google.load("jqueryui", "1"); </script>
<script src="/includes/new.js" type="text/javascript"></script>