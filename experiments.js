/************

  experiments.js -  Wed Jun 19 14:01:52 CDT 2024

*************/

 
///////////////////////////////////////////////
// Setting up the DOM
document.addEventListener("DOMContentLoaded", ready); // wait for it to load.
function ready() {
	var current = document.querySelector ('[aria-current=true]');
// 	console.log(current.id);
	set_tab(current.id);
	
///////////	
	var page_buttons = document.getElementsByClassName('page_button');
		var new_html;
		for (let i=0; i<page_buttons.length; i++){
			page_buttons[i].addEventListener('click', function(event){
			for (let j=0; j<page_buttons.length; j++){
				page_buttons[j].setAttribute('aria-current', false);
			}
			
			this.setAttribute('aria-current', true);
// 			console.log(this.id);
			set_tab(this.id);
		});
	}

}

///////////////////////////////////////////////
// Straight functions.

//----------------------------------------
function set_tab(tab_id){
	switch(tab_id){
		case 'pb0':
			set_pb0();
			break;
		case 'pb1':
			set_pb1();
			break;
		case 'pb2':
			set_pb2();
			break;
		case 'pb3':
			set_pb3();
			break;
		case 'pb4':
			set_pb4();
			break;
		case 'pb5':
			set_pb5();
			break;
		default:
			break;
	}
}

//----------------------------------------

function set_pb0() {
	new_html  = ' <div id="text_div">'+ "\n";
	new_html +=  ' <input type="hidden" id="id" value="">'+ "\n";
	new_html +=    '<input type="text" id="descriptor" placeholder="Give a quick description" >'+ "\n";
	new_html +=    '<textarea id="some_text"  placeholder="What is on your mind?" ></textarea>'+ "\n";
	new_html +=    '<div class="button_center">'+ "\n";
	new_html +=    '<button id="get_random">Random</button> <button id="update">Update</button> <button id="new_text">New</button>'+ "\n";
	new_html +=    '</div>'
	new_html +=  '</div>' + "\n";
	new_html += "</canvas>\n";
	document.getElementById('workspace').innerHTML = new_html;
	var text_div = document.getElementById('text_div');
	load_text_div(text_div);
}

//----------------------------------------
function load_text_div(text_div) {
	
	// RANDOM button 
	document.getElementById('get_random').addEventListener('click', function(event){
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/experiments/backend.php", true);
		xhr.responsetype = "json";
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// send the request
		xhr.send("action=get_random_text");
		 
		// Handle the response, when it comes.
        xhr.onreadystatechange = function(event){
          if (xhr.readyState == 4 && xhr.status == 200) {
             
             var response = JSON.parse(this.response);
             console.log('here');
                 console.log(response);
             document.getElementById('id').value = response.id;
             document.getElementById('descriptor').value = response.descriptor;
             document.getElementById('some_text').value = response.some_text;
          }
        };
        // error
        xhr.onerror = function(event) {
          console.log(event);
        };      
	});

	// UPDATE button
	var update = document.getElementById('update');
	// check to see if the update button needs to be disabled
	if(document.getElementById('id').value === ""){
		update.setAttribute("disabled", "disabled");
	}
	// otherwise let the listener update that row 
	update.addEventListener('click', function(event){
		var the_data = {};
		the_data['id'] = document.getElementById('id').value;
		the_data['descriptor'] = document.getElementById('descriptor').value;
		the_data['some_text'] = document.getElementById('some_text').value;
		
		aj_promise = ajaxCall("update_text", the_data)
		.then((json_response) =>{
			console.log(json_response);
		
		}).catch((error) => {
            console.log(`An error occured: ${error}`);
        });
		
		
	});
	
	// NEW TEXT button
	document.getElementById('new_text').addEventListener('click', function(event){
		console.log('it was clicked');
	});
}


//----------------------------------------
function set_pb1() {
	new_html  = '<canvas id="artboard">' + "\n";
	new_html += "</canvas>\n";
	document.getElementById('workspace').innerHTML = new_html;
	var artboard = document.getElementById('artboard'); 
// 	console.log(artboard);
	load_artboard(artboard);
}

//----------------------------------------
function load_artboard(artboard) {
	var rect = artboard.getBoundingClientRect();
	var context = artboard.getContext("2d");

	var w = artboard.offsetWidth;
	var h = artboard.offsetHeight;
	artboard.width = w;
	artboard.height = h;
	
	window.addEventListener('resize', function(event){
		console.log('it moved');
		w = artboard.offsetWidth;
		h = artboard.offsetHeight;
		artboard.width = w;
		artboard.height = h;
	});
	
	artboard.addEventListener('click', function(event) {

		let x = Math.floor(event.clientX - rect.left);
		let y = Math.floor(event.clientY - rect.top);
// 		console.log('x: ' + x + ', y: ' + y);
		let r = Math.floor(Math.random() * 256);
		let g = Math.floor(Math.random() * 256);
		let b = Math.floor(Math.random() * 256);
// 		console.log('r: ' + r + ', g: ' + g + ', b: ' + b);
		context.fillStyle = "rgba("+ r +", " + g +", " + b + ", 70)";
// 		context.fillStyle = "green";
		context.fillRect(x, y, 7, 7);
	});
}


//----------------------------------------
function set_pb2() {
	new_html  = '<canvas id="artboard2">' + "\n";
	new_html += "</canvas>\n";
	document.getElementById('workspace').innerHTML = new_html;
	var artboard2 = document.getElementById('artboard2'); 
	console.log(artboard2);
	load_artboard2(artboard2);
}

//----------------------------------------
function load_artboard2(artboard2) {
	var rect = artboard2.getBoundingClientRect()

	artboard2.width = artboard2.offsetWidth;
	artboard2.height = artboard2.offsetHeight;
	var context = artboard2.getContext("2d");
	var startX;  // these probably don't need to be 'global'
	var startY;
	var endX;
	var endY;
	
	var started = false;
	window.addEventListener("resize", function(event){
		artboard2.width = artboard2.offsetWidth;
		artboard2.height = artboard2.offsetHeight;
		var context = artboard2.getContext("2d");
	});
	
	artboard2.addEventListener('mousedown', function(event){
		let r = Math.floor(Math.random() * 256);
		let g = Math.floor(Math.random() * 256);
		let b = Math.floor(Math.random() * 256);
		context.strokeStyle = "rgba("+ r +", " + g +", " + b + ", 70)";
		
		started = true;
		startX = Math.floor(event.clientX - rect.left);
		startY = Math.floor(event.clientY - rect.top);
		
		context.beginPath(startX, startY);
		context.moveTo(startX, startY);
	});
	artboard2.addEventListener('mouseup', function(event){
		started = false;
// 			endX = Math.floor(event.clientX - rect.left);
// 			endY = Math.floor(event.clientY - rect.top);
// 			
// 			context.lineTo(endX, endY);
// 			context.stroke();
	});
	artboard2.addEventListener('mousemove', function(event){
		if(started === false) return;
		
		endX = Math.floor(event.clientX - rect.left);
		endY = Math.floor(event.clientY - rect.top);
		
		context.lineTo(endX, endY);
		context.stroke();
	});
}

//----------------------------------------
function set_pb3(){
	new_html  = '<div id="hsl_play">' + "\n";
	new_html += '	<input type="range" min="1" max="360" value="50" class="slider" id="h"> <label for="h"><span id="hval">50</span> Hue</label>' + "\n";
	new_html += '	<input type="range" min="1" max="100" value="50" class="slider" id="s"> <label for="s"><span id="sval">50</span>% Saturation </label>' + "\n";
	new_html += '	<input type="range" min="1" max="100" value="50" class="slider" id="l"> <label for="l"><span id="lval">50</span>% Lightness </label>' + "\n";
	new_html += '</div>' + "\n";
	hsl_play = document.getElementById('workspace').innerHTML = new_html;
	load_hsl_play(hsl_play);
}

//----------------------------------------
function load_hsl_play(hsl_play) {
	var sliders = document.getElementsByClassName('slider') ;
	
	for(var i =0; i < sliders.length; i++){
		sliders[i].addEventListener("input", function() {
			var id = this.id;
			var new_id = id + 'val';
// 			console.log(new_id);
			document.getElementById(new_id).innerHTML = this.value;
			var h, s, l;
			switch (id){
				case 'h':
					h = this.value;
					s = document.getElementById('s').value;
					l = document.getElementById('l').value;
					break;
				case 's':
					h = document.getElementById('h').value;
					s = this.value;
					l = document.getElementById('l').value;
					break;
				case 'l':
					h = document.getElementById('h').value;
					s = document.getElementById('s').value;
					l = this.value;
					break;
				default:
					break;
			};
// 			element = document.querySelector('#hsl_play');
			var hsl_str = 'hsl(' + h + ', ' + s + '%, ' + l +'%)';
// 			console.log(hsl_str);
// 			hsl_play.style.background = hsl_str;
			document.getElementById('hsl_play').style.background = hsl_str;
			
//     		console.log(this.value);
		});
	}
}

//----------------------------------------
// https://www.smashingmagazine.com/2024/08/history-future-regular-expressions-javascript/
function set_pb4(){
	new_html  = '<br><br><input type="text" class="wide_text" id="input_text" ><br><br>' + "\n";
	new_html += '<label for="to_replace">To Replace: </label><input type="text" name="to_replace" id="to_replace"> &nbsp; &nbsp; &nbsp;' + "\n";
	new_html += '<label for="replace_with">Replace with: </label><input type="text" name="replace_with" id="replace_with"> <br><br>' + "\n";
	new_html += '<button id="doit">RegEx It</button> <br><br>' + "\n";
	new_html += '<p id="output">This is the output.</p>' + "\n";
	
	document.getElementById('workspace').innerHTML = new_html;
	doit = document.getElementById('doit');
	console.log(doit);
	load_regex(doit);
}


//----------------------------------------
function load_regex(doit){
// 	var doit = document.getElementById(doit);
	doit.addEventListener('click', function(event){
		var input_text = document.getElementById('input_text').value;
		var to_replace = document.getElementById('to_replace').value;
		console.log(to_replace);
		var replace_with = document.getElementById('replace_with').value;
		console.log(replace_with);
		let out_text = input_text.replace(to_replace, replace_with);
		console.log(out_text);
		
		document.getElementById('output').innerHTML = out_text;
	});
}

//----------------------------------------
function set_pb5(){
	new_html  = '<canvas id="artboard3"  width="500" height="500"></canvas>' + "\n";
	document.getElementById('workspace').innerHTML = new_html;
	
	const canvas = document.getElementById('artboard3');
	
	load_game_of_life(canvas);
}

function load_game_of_life(canvas) {
	const ctx = canvas.getContext('2d');
	
// 	const gridSize = 20;
	const canvasWidth = canvas.width;
	const canvasHeight = canvas.height;
	const gridSize = 20;
	
	let grid = [];
	
	function createGrid() {
	  grid = [];
	  for (let x = 0; x < canvasWidth / gridSize; x++) {
		grid[x] = [];
		for (let y = 0; y < canvasHeight / gridSize; y++) {
		  grid[x][y] = Math.random() < 0.5 ? 1 : 0;
		}
	  }
	}
	
	function drawGrid() {
	  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	  for (let x = 0; x < canvasWidth / gridSize; x++) {
		for (let y = 0; y < canvasHeight / gridSize; y++) {
		  if (grid[x][y] === 1) {
			ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
		  }
		}
	  }
	}
	
	function countNeighbors(x, y) {
	  let sum = 0;
	  for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
		  if (i === 0 && j === 0) continue;
		  const col = (x + i + grid[0].length) % grid[0].length;
		  const row = (y + j + grid.length) % grid.length;
		  sum += grid[col][row];
		}
	  }
	  return sum;
	}
	
	function updateGrid() {
	  const nextGrid = [];
	  for (let x = 0; x < canvasWidth / gridSize; x++) {
		nextGrid[x] = [];
		for (let y = 0; y < canvasHeight / gridSize; y++) {
		  const state = grid[x][y];
		  const neighbors = countNeighbors(x, y);
	
		  if (state === 0 && neighbors === 3) {
			nextGrid[x][y] = 1;
		  } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
			nextGrid[x][y] = 0;
		  } else {
			nextGrid[x][y] = state;
		  }
		}
	  }
	  grid = nextGrid;
	}
	
	function gameLoop() {
	  drawGrid();
	  updateGrid();
	  requestAnimationFrame(gameLoop);
	}
	
	createGrid();
	gameLoop();
}

//----------------------------------------
async function ajaxCall(action='', data={}) {
// 	console.log(id); 
	const response = await fetch("./backend.php", {
		// Be aware that there are other options if you want more flexibility
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: "action=" + action + "&data=" + JSON.stringify(data), // body data type must match "Content-Type" header
	});
	 if (!response.ok) {
		console.log(response);
		throw new Error(`HTTP error: ${response.status}`);
	 }

	return response.json();
}
