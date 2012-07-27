Zepto(function($){
	var artworkID = $('#ZoomFileID').attr('value');
	var imgType = $('#imgExt').attr('value');
	var zoomSizes = eval($('#ZoomAvilSizes').attr('value'));
	var maxZoom = zoomSizes[1];	//default zoom

	var totalTiles = totalWidth = totalHeight = counter = 0;
	
	if ($('#ZoomFileID').attr('value')) {
		$('#downloadAComp').html($('#downloadAComp').html() +'<img src="http://i.istockimg.com/static/images/blank.gif" class="sptGreySeparator">'+'<a href="#downloadLargeComp" id="downloadLargeComp">Download a large comp</a>');

		$('#downloadLargeComp').click(function() {
			$("#ZoomImage").trigger('click');
			$("#wrapper").hide();
			
			setTimeout(function() {
				tileHeight = Math.ceil(Math.abs(parseInt($("#h0Img").css('height')))/380);
				tileWidth = Math.ceil(Math.abs(parseInt($("#h0Img").css('width')))/380);
				totalTiles = tileWidth * tileHeight;

				$("#wrapper").show();
				glue();
			}, 1000);

			return false;
		});
	} else {
		$('#downloadAComp').html('Sign in to download large comp');
	}

	function glue() {
		$('#wrapper').text('');
		$('footer').text('').css('marginTop', '50px');

		var status = document.createElement("DIV");
		status.setAttribute('style', 'clear: both;');
		status.innerHTML = "<p id=\"status\"></p>";
		document.getElementById('wrapper').appendChild(status);

		var cont = document.createElement("DIV");
		cont.setAttribute('id', 'cont');
		cont.setAttribute('style', 'clear: both;');
		document.getElementById('wrapper').appendChild(cont);

		var i = 0;
		for (y=0; y<tileHeight; y++) {
			for (x=0; x<tileWidth; x++) {
				offsetX = 190 + (x * 380);
				offsetY = 190 + (y * 380);

				addImage("http://www.istockphoto.com/file_inspector_view/"+ artworkID +"/"+ maxZoom +"/"+ offsetX +"/"+ offsetY +"/zoom_"+ artworkID +"."+imgType, i);

				i++;
			}
			var br = document.createElement("BR");
			br.setAttribute('clear', 'all');
			document.getElementById('cont').appendChild(br);
		}
	}
	
	function addImage(url, c) {
		var img = document.createElement("img");
		img.id = "zoompiece"+ c;
		img.src = url;
		img.setAttribute('style','display: block; margin: 0; float: left;');
		img.onload = function() {
			if (c < tileWidth) totalWidth += img.width;
			if (c % tileWidth == 0) totalHeight += img.height;
			
			img.height = img.height / 10;

			counter++;

			setStatus("Downloading zoom tiles, please wait... "+ counter +"/"+ totalTiles);

			if (counter == totalTiles) {
				setStatus("Generating download link...");

				setTimeout(function() {
					concatenateImages(totalWidth, totalHeight)
				}, 600);
			}
		};

		document.getElementById('cont').appendChild(img);

		img.onerror = function() {
			document.getElementById('cont').removeChild(img);
			totalTiles--;
		};
	}
	
	function setStatus(s) {
		$('#status').html(s + "<br><br><a href=\""+ document.location.href +"\" style=\"text-decoration: underline;\">Cancel</a>");
	}
	
	function concatenateImages(w, h) {
		var canvas = document.createElement("canvas");
		canvas.id = 'canvas';
		canvas.width = w;
		canvas.height = h;
		document.getElementById('cont').appendChild(canvas);

	    var ctx = canvas.getContext("2d");

		var p = 0;
		for (y=0; y<tileHeight; y++) {
			for (x=0; x<tileWidth; x++) {
				var img = document.getElementById('zoompiece'+ p++);
				ctx.drawImage(img, x*380, y*380);
			}
		}

		var grabcanvas = document.getElementById("canvas");
		var imgdata = grabcanvas.toDataURL("image/jpeg");
		imgdata = imgdata.replace("image/jpeg", "image/octet-stream");

		setStatus("<a href=\""+ imgdata +"\" style=\"text-decoration: underline;\">Option-click this link to download the large comp</a><br><br><b>Important information:</b><br><em style=\"color: red;\">Whilst downloading the large image your browser will become totally unresponsive for a short while. Do not panic - it has not crashed!</em><br>A large JPEG image will be saved to your download folder with the filename \"Unknown\" which can then be renamed.");

		$('#canvas').hide();
	}
});
