<?php
// index.php -  Wed Jun 19 14:01:52 CDT 2024
// 

?>
<!DOCTYPE html>
<html lang="en">
<HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/ >
<title>Experiments!</title>
<link rel="stylesheet" href="style.css">
<script type="text/javascript" src="experiments.js"></script>
</HEAD>
<body>
<?php
	include "header.php";
?>
<div id="workspace">
 <div id="text_div">
   <input type="hidden" id="id" value="">
   <input type="text" id="descriptor" placeholder="Give a quick description" >
   <textarea id="some_text"  placeholder="What is on your mind?" ></textarea>
   <div class="button_center">
   <button id="get_random">Random</button> <button id="update">Update</button> <button id="new_text">New</button>
   </div>
 </div>

<!-- 

<div id="hsl_play">
	<input type="range" min="1" max="360" value="50" class="slider" id="h"> <label for="h"> <span id="hval">50</span> Hue</label>
	<input type="range" min="1" max="100" value="50" class="slider" id="s"> <label for="s"><span id="sval">50</span>% Saturation </label>
	<input type="range" min="1" max="100" value="50" class="slider" id="l"> <label for="l"><span id="lval">50</span>% Lightness </label>
</div>
 -->
<!-- 
	<canvas id="artboard">
	</canvas>
 -->
</div>
</body>
</html>
