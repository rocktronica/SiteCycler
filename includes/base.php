<?php

// if (!isset($_GET["debug"])) { exit("Come back later. kthnxbai."); }

function pagetitle() {
	$page = page();
	switch ($page) {
		case "go":
			$t = explode(",", $_GET["t"]);
			$ts = "";
			foreach ($t as $i => $url) {
				$ts = $ts.$t[$i]." / ";
			}
			return substr($ts, 0, -3);
		case "get-started":
			return "Get Started";
		case "edit":
			return "Edit";
		case "information":
			return "Information";
		default:
			return "A Slideshow for Websites";
	}
}

function page() {
	$split = explode("/", $_SERVER['REQUEST_URI']);
	$page = $split[1];
	if (($page == "get-started") || ($page == "information") || ($page == "edit")) {
		return $page;
	} elseif ($page == "") {
		return "front";
	} elseif(HasUT()) {
		return "go";
	} elseif(trim($page) == "") {
		return "front";
	} else {
		return "404";
	}
}

function HasUT () {
	if (isset($_GET["u"]) && isset($_GET["t"])) {
		return true;
	} else {
		return false;
	}
}

function ValidUT () {
	if (HasUT()) {
		$u = explode(",", $_GET["u"]);
		$t = explode(",", $_GET["t"]);
		if (count($u) == count($t)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

?>