<?php include "includes/header.php" ?>
<h2>Information</h2>
<h3>Instructions</h3>
<ul>
	<li>Move your mouse to slide the navigation out. Hover over it to make it stay, or just wait and it'll slide back in.</li>
	<li>Click a link to transition to it or use your keyboard's <span class="pictos">&larr; &uarr; &rarr; &darr;</span> keys to move through the sites.</li>
	<li>Double click a link to go to that site and exit SiteCycler.</li>
	<li>Set your browser to fullscreen for a boost in WPM (Wows per Minute).</li>
</ul>
<h3>Working with Images</h3>
<p>You'll notice that if you run an image through SiteCycler, it'll display as its default size with the browser's default styling, which may or may not be what you want.</p>
<p>To circumvent, first run those image URLs through another app I made called <a href="http://bigimg.it/">BigImg.It, a Big Image Embed Applet</a>.</p>
<h3>Options</h3>
<div id="optionstable">
	<h4 class="cycle pictos dark"><span></span>Cycle</h4>
	<p>Automatically move through the sites w/o user interaction. Useful for unmanned displays or kiosks.</p>
	<h4 class="refresh pictos dark"><span></span>Refresh</h4>
	<p>Refreshes the sites. Good for time-sensitive content that needs to be manually refreshed. Especially handy for troublesome Flash sites that crash if left on too long.</p>
	<h4 class="random pictos dark"><span></span>Random</h4>
	<p><code>Math.floor(Math.random()*($("#nav_links a").size()));</code></p>
	<p>Generate a random fraction between 0 and 1, multiply it by the number of links in the navigation, then round down the remainder.</p>
	<h4 class="edit pictos dark"><span></span>Edit</h4>
	<p>Populate the "Get Started" form with the active navigation.</p>
</div>
<h3 class="clear">FAQ</h3>
<p>None yet. <a href="http://iamnotagoodartist.com/#contact_form">Contact me</a> and ask me something!</p>
<?php include "includes/footer.php" ?>