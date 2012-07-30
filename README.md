# iStockLargeComp

Generates a downloadable large comp from the individual zoom tiles on iStockphoto.com

## Background

iStockPhoto has a zoom function that lets you pan around a large version of the image, loading sections of it as you go.  
It's kind of like Google Maps, but with a photo or illustration instead of a map. 

## How it works

This extension loads all the individual zoom tiles, stitches them together as a large image, and gives you a handy download link.  
The process takes a minute or two, but is a lot faster than if you had to do it by hand.

## Download

[iStockLargeComp.safariextz](http://www.gingerbeardman.com/safari/iStockLargeComp.safariextz) (19KB)

## How to use
Once activated, there will be an extra option underneath the image "Download a large comp":

![Download a large comp](http://www.gingerbeardman.com/safari/istocklargecomp.png)

Clicking on this will begin the three-step generation of the comp:

Step 1/3  
![Downloading zoom tiles...](http://www.gingerbeardman.com/safari/istocklargecomp-step1.png)

Step 2/3  
![Generating download link...](http://www.gingerbeardman.com/safari/istocklargecomp-step2.png)

Step 3/3  
![Download ready](http://www.gingerbeardman.com/safari/istocklargecomp-step3.png)

### How can you help?

Grab max zoom information by reusing/hooking into the XMLHttpRequest to `ajax_class_creator.php`  
This would also mean that the script could use trusted, accurate values for targetWidth and targetHeight rather than having to calculate them in an error-prone way.

Sample JSON response from [a sample page](http://www.istockphoto.com/stock-illustration-20718384-burj-khalifa.php):

	{
	    "size": 37,
	    "move": "zoomout",
	    "currentX": 1897,
	    "currentY": 3147,
	    "images": [
	        ...
	    ],
	    "constraintRight": 3237,
	    "constraintBottom": 5720,
	    "divWidth": 3800,
	    "divHeight": 6460,
	    "divLeft": -1707,
	    "divTop": -2957,
	    "viewPortWidth": 380,
	    "viewPortHeight": 380,
	    "targetWidth": "3617",
	    "targetHeight": "6100",
	    "host": "http:\/\/www.istockphoto.com\/",
	    "sampleImage": ""
	}

### License
This is made available under a [Creative Commons Attribution-Share Alike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0).