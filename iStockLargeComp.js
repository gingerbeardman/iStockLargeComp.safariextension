Zepto(function($){
	//get some form values
	var ZoomFileID = $('#ZoomFileID').attr('value');
	var ZoomMaxSize = $('#ZoomMaxSize').attr('value');
	var ZoomImageWidth = $('#ZoomImage').attr('width');
	var ZoomImageHeight = $('#ZoomImage').attr('height');

	function clicker() {
		//zoom in
		for (c = 1; c <= ZoomMaxSize; c++)
			$('#zoom-in-img').trigger('click');

		//zoom out
		for (c = 1; c <= ZoomMaxSize; c++)
			$('#zoom-out-img').trigger('click');

		choice = confirm("Do you wish to download the Large Comp?");
		
		if (choice) {
			//open in new window
			window.open($('#download-large-comp').attr('href'));
		}
	}
	
	function init() {
		//add new link to download a large comp
		$('#download-comp').text('Download a Large Comp').attr('href', 'http://www.istockphoto.com/image-zoom/'+ZoomFileID+'/'+ZoomMaxSize+'/'+ZoomImageWidth+'/'+ZoomImageHeight+'/zoom-'+ZoomFileID+'-'+ZoomMaxSize+'.jpg');
		$('#download-comp').attr('id', 'download-large-comp');
		
		$('#download-large-comp').click(function(event) {
			event.preventDefault();

			//trigger zoom
			$('#zoom-hover-div').trigger('click');

			//trigger zoom in to max
			setTimeout(clicker, 250);
		});
	}

	window.addEventListener("load", init, false)
});
