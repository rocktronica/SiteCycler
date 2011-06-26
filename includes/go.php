<div id="nav">
	<h1><a href="/">SiteCycler</a></h1>
	<ul id="nav_links">
		<?php $footercookie = "";
		$u = explode(",", $_GET["u"]);
		$t = explode(",", $_GET["t"]);
		foreach ($u as $i => $url) {
			echo "<li><a href='".$url."' rel='".$i."'><img src='http://getfavicon.appspot.com/".$url."?defaulticon=http://sitecycler.com/images/blankfavicon.png' alt='".$t[$i]."' width='16' height='16' />".$t[$i]."</a></li>\n";
			$footercookie = $footercookie."<a href='".$url."'>".$t[$i]."</a> ";
//			$urlparse = parse_url($url);
//			echo "<li><a href='".$url."' rel='".$i."'><img src='http://www.google.com/s2/favicons?domain=".$urlparse["host"]."' alt='".$t[$i]."' width='16' height='16' />".$t[$i]."</a></li>\n";
		}
		setcookie("footercookie", $footercookie, (30 * 60 * 24 * 60 + time())); ?>
	</ul>
	<p class="nomargin"><a href="#" class="updown" rel="more">Options</a></p>
	<div id="more" class="hidden">
		<ul id="nav_options">
			<li><a href="#" id="nav_options_cycle" class="nav_option cycle pictos" rel="cycle"><span></span>Cycle every</a>
				<select id="cycleduration">
					<option value="5000">5sec</option>
					<option value="15000">15sec</option>
					<option value="30000">30sec</option>
					<option value="60000">1min</option>
					<option value="120000">2min</option>
					<option value="300000">5min</option>
				</select>
			</li>
			<li><a href="#" id="nav_options_refresh" class="nav_option refresh pictos" rel="refresh"><span></span>Refresh every</a>
				<select id="refreshduration">
					<option value="60000">1min</option>
					<option value="300000">5min</option>
					<option value="600000">10min</option>
					<option value="900000">15min</option>
					<option value="1800000">30min</option>
					<option value="3600000">1hr</option>
				</select>
			</li>
			<li><a href="#" class="nav_option random pictos" id="nav_options_random" rel="random"><span></span>Random</a></li>
			<?php if (isset($_GET["debug2"])) { ?>
				<li><a href="#" class="nav_option" rel="gradient">Gradient</a></li>
				<li><a href="#" class="nav_option" rel="transition">Transition</a>
					<select id="transition" class="tommyselect">
						<option value="cut">Cut</option>
						<option value="fade">Fade</option>
						<option value="slide">Slide</option>
					</select>
				</li>
			<?php } ?>
		</ul>
		<a href="/edit<?php echo $_SERVER["REQUEST_URI"]; ?>" class="edit pictos"><span></span>Edit</a>
	</div>
</div>

<div id="loading"><p>0</p></div>
<div id="veil"></div>
<div id="black"></div>
<img id="gradient"></div>
<div id="timerbar">
	<div id="timerbar_progress"></div>
</div>

<div id="nojs">
	<p>Please enable JavaScript in your browser.</p>
</div>

<script src="http://www.google.com/jsapi" type="text/javascript"></script>
<script type="text/javascript">google.load("jquery", "1"); </script>
<script src="/includes/go.js" type="text/javascript"></script>