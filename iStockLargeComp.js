document.addEventListener("DOMContentLoaded", function(event) {
	if (window.top === window) {
		var uri = window.location.pathname.split('/');
		var iStockName = uri[3].substr(0,uri[3].indexOf('gm')-1);

		var photo = uri[uri.length - 1].split('-');
		var iStockId = photo[photo.length - 2].substr(2);

		var iStockSize = '2048x2048';

		if (!document.getElementById('download-comp')) {
			var checkExist = setInterval(function() {
				if (document.getElementById('download-button')) {
					clearInterval(checkExist);

					var butt = document.createElement('a');
					butt.textContent = 'Download large comp';
					butt.id = 'download-comp';
					butt.className = 'super-cta comp-cta';
					butt.target = '_blank';
					butt.href = 'http://media.istockphoto.com/photos/'+ iStockName +'-id'+ iStockId +'?s='+ iStockSize;

					insertAfter( butt, document.getElementById('download-button') );
				}
			}, 100); // check every 100ms
		}
	}
});

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextElementSibling);
}
