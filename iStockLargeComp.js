Zepto(function($){
	//get some form values
	var artworkID = $('#ZoomFileID').attr('value');
	var imgType = $('#imgExt').attr('value');
	var zoomSizes = eval($('#ZoomAvilSizes').attr('value'));

	//set some defaults
	var maxZoom = zoomSizes[1];	//default zoom
	var totalTiles = targetWidth = targetHeight = counter = 0;
	
	//if we have a fileid on this page, inject content
	if ($('#ZoomFileID').attr('value')) {
		//add new link to download a large comp
		$('#downloadAComp').html($('#downloadAComp').html() +'<img src="http://i.istockimg.com/static/images/blank.gif" class="sptGreySeparator">'+'<a href="#downloadLargeComp" id="downloadLargeComp">Download a large comp</a>');

		//add new link click event
		$('#downloadLargeComp').click(function() {
			//trigger zoom
			$("#ZoomImage").trigger('click');
			//hide page content
			$("#wrapper").hide();
			
			//wait a little while for zoom to activate
			setTimeout(function() {
				//grab width and height of image in tiles
				tileHeight = Math.ceil(Math.abs(parseInt($("#h0Img").css('height')))/380);
				tileWidth = Math.ceil(Math.abs(parseInt($("#h0Img").css('width')))/380);
				//calc total tile count
				totalTiles = tileWidth * tileHeight;

				//show page content
				$("#wrapper").show();

				//do the tile loading
				tileLoad();
			}, 1000);

			return false;
		});
	} else {
		//zoom only works when signed in
		$('#downloadAComp').html('Sign in to download large comp');
	}

	function tileLoad() {
		//remove page content
		$('#wrapper').text('');
		//set some space where footer used to be
		$('footer').text('').css('marginTop', '50px');

		//create status div
		var status = document.createElement("DIV");
		status.setAttribute('style', 'clear: both;');
		status.innerHTML = "<p id=\"status\"></p>";
		document.getElementById('wrapper').appendChild(status);

		//create container div
		var cont = document.createElement("DIV");
		cont.setAttribute('id', 'cont');
		cont.setAttribute('style', 'clear: both;');
		document.getElementById('wrapper').appendChild(cont);

		//look through all tiles, loading them in
		var i = 0;
		for (y=0; y<tileHeight; y++) {
			for (x=0; x<tileWidth; x++) {
				offsetX = 190 + (x * 380);
				offsetY = 190 + (y * 380);

				// * look up arguments elsewhere in code
				addImage("http://www.istockphoto.com/file_inspector_view/"+ artworkID +"/"+ maxZoom +"/"+ offsetX +"/"+ offsetY +"/zoom_"+ artworkID +"."+ imgType, i);

				i++;
			}
			//line break after each row
			var br = document.createElement("BR");
			br.setAttribute('clear', 'all');
			document.getElementById('cont').appendChild(br);
		}
	}
	
	//inject image into doc
	function addImage(url, c) {
		//create image tag
		var img = document.createElement("img");
		img.id = "zoompiece"+ c;
		img.src = url;
		img.setAttribute('style','display: block; margin: 0; float: left;');
		//if valid image
		img.onload = function() {
			//calc total width using first row
			if (c < tileWidth) targetWidth += img.width;
			//calc total height using first col
			if (c % tileWidth == 0) targetHeight += img.height;
			
			//once we've got the dimensions, reduce tile size as a preview
			img.height = img.height / 10;

			//progress counter
			counter++;

			//set progress status
			setStatus("Downloading zoom tiles, please wait... "+ counter +"/"+ totalTiles);

			//once all tiles are loaded
			if (counter == totalTiles) {
				//update status
				setStatus("Generating download link...");

				//wait a moment for final tile to load
				setTimeout(function() {
					//draw images onto canvas
					concatenateImages(targetWidth, targetHeight)
				}, 600);
			}
		};

		//if invalid image, remove it from the doc
		img.onerror = function() {
			document.getElementById('cont').removeChild(img);
			totalTiles--;
		};

		//add image into
		document.getElementById('cont').appendChild(img);
	}
	
	//helper
	function setStatus(s) {
		$('#status').html(s + "<br><br><a href=\""+ document.location.href +"\" style=\"text-decoration: underline;\">Cancel</a>");
	}
	
	//canvas work
	function concatenateImages(w, h) {
		//create canvas
		var canvas = document.createElement("canvas");
		canvas.id = 'canvas';
		canvas.width = w;
		canvas.height = h;
		document.getElementById('cont').appendChild(canvas);

		//get canvas context
	    var ctx = canvas.getContext("2d");

		//loop through tiles drawing each on the canvas
		var p = 0;
		for (y=0; y<tileHeight; y++) {
			for (x=0; x<tileWidth; x++) {
				var img = document.getElementById('zoompiece'+ p++);
				ctx.drawImage(img, x*380, y*380);
			}
		}

		//get canvas element
		var grabcanvas = document.getElementById("canvas");
		//convert canvas to data
		var imgdata = grabcanvas.toDataURL("image/jpeg");
		//change type of data to force download
		imgdata = imgdata.replace("image/jpeg", "image/octet-stream");

		//set status with download link, and warning
		setStatus("<a href=\""+ imgdata +"\" download=\"iStockLargeComp.jpg\" style=\"text-decoration: underline;\">Option-click this link to download the large comp</a><br><br><b>Important information:</b><br><em style=\"color: red;\">Whilst downloading the large image your browser will become totally unresponsive for a short while. Do not panic - it has not crashed!</em><br>A large JPEG image will be saved to your download folder with the filename \"Unknown\" which can then be renamed.");

		//hide canvas element
		$('#canvas').hide();
	}
});
