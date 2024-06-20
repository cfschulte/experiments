/************

  experiments.js -  Wed Jun 19 14:01:52 CDT 2024

*************/

 
///////////////////////////////////////////////
// Setting up the DOM
document.addEventListener("DOMContentLoaded", ready); // wait for it to load.
function ready() {
	
///////////	
	var page_buttons = document.getElementsByClassName('page_button');
		var new_html;
		for (let i=0; i<page_buttons.length; i++){
			page_buttons[i].addEventListener('click', function(event){
			for (let j=0; j<page_buttons.length; j++){
				page_buttons[j].setAttribute('aria-current', false);
			}
			
			this.setAttribute('aria-current', true);
			console.log(this.id);
			switch(this.id){
				case 'pb1':
					new_html  = '<canvas id="artboard">' + "\n";
					new_html += "</canvas>\n";
					document.getElementById('workspace').innerHTML = new_html;
					var artboard = document.getElementById('artboard'); 
					console.log(artboard);
					load_artboard(artboard);
					break;
				case 'pb2':
					new_html  = '<canvas id="artboard2">' + "\n";
					new_html += "</canvas>\n";
					document.getElementById('workspace').innerHTML = new_html;
// 					waitForElm('#artboard2').then((elm) => {
// 						console.log(elm);
// 						load_artboard2(elm);
// 					});
					var artboard2 = document.getElementById('artboard2'); 
					console.log(artboard2);
					load_artboard2(artboard2);
					break;
				case 'pb3':
// 					document.getElementById('workspace').innerHTML = '';
					new_html  = '<div id="hsl_play">' + "\n";
					new_html += '	<input type="range" min="1" max="360" value="50" class="slider" id="h"> <label for="h"><span id="hval">50</span> Hue</label>' + "\n";
					new_html += '	<input type="range" min="1" max="100" value="50" class="slider" id="s"> <label for="s"><span id="sval">50</span>% Saturation </label>' + "\n";
					new_html += '	<input type="range" min="1" max="100" value="50" class="slider" id="l"> <label for="l"><span id="lval">50</span>% Lightness </label>' + "\n";
					new_html += '</div>' + "\n";
					hsl_play = document.getElementById('workspace').innerHTML = new_html;
					load_hsl_play(hsl_play);
					break;
				case 'pb3':
					break;
				default:
					break;
			}
		});
	}

///////////	
	var text_div = document.getElementById('text_div');
	if(text_div != null) {
		load_text_div(text_div);
	}

///////////	
	var hsl_play = document.getElementById('hsl_play');
	if(hsl_play != null){
		load_hsl_play(hsl_play);
	} 
	
///////////	
	// respond to clicks in the artboard
	var artboard = document.getElementById('artboard'); 
	if(artboard != null){
		load_artboard(artboard)
	} 
		
	
}

///////////////////////////////////////////////
// Straight functions.
//----------------------------------------
function load_artboard(artboard) {
	var rect = artboard.getBoundingClientRect();
	var context = artboard.getContext("2d");

	var w = artboard.offsetWidth;
	var h = artboard.offsetHeight;
	artboard.width = w;
	artboard.height = h;
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
async function ajaxCall(action='', data={}) {
// 	console.log(id); 
	const response = await fetch("/random_text_db/controllers/ajax_parser.php", {
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
