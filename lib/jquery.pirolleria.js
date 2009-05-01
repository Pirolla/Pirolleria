/**
* Pirolleria (http://pirolla.com/pirolleria)
*
* Pirolleria is a javascript sort of image gallery written in jQuery and PHP. 
* It loads the images path and metadata form a database and creates a JSON file.
* This JSON file is loaded with XML requests an rely on the order of the images JSON array to display the grid.
* As scaled images with css takes a lifetime to animate on slow machines I prefer to implement the thumbnail creation
* with server side PHP. Yes, I intend to make some animations to switch between pages in a future.
* 
* I also intend to make a static version. As I wished to make an AJAX sctrict page, the progressive enhancement
* proved very complex tending to be easier to create statis html files form the already constructed JSON files.
*
*
* Copyright (c) 2009 Rafael Pirolla (http://rafael.pirolla.com)
* Licensed under the GPL licenses.
* http://www.gnu.org/licenses/gpl.txt
**/

(function($){

	var $$;


	/**
	* 
	* @desc Makes a gallery :P
	* @author Rafael Pirolla
	* @version 0.1
	*
	* @name Pirolleria
	* @type jQuery
	*
	* @cat plugins/Media
	* 
	* @example $('#div').pirolleria({options});
	* @desc Create a a gallery from the JSON passed as atributte
	* @options
	*   json:          relative path to the gallery json (syntax to be documented) - only one per page at the moment
	*   visibleArea:   the size of the grid of images
	*                  things to be defined as how to calculate the min-width or so, didn't think of this yet
	*   history:       boolean for setting the history (enable the back and forth button, static links and bookmarks)
	**/

	$$ = $.fn.pirolleria = function(options) {
		
		// private vars
		var current;
		
		// plugin defaults
		var defaults = {
			json        : 'data/main/main.json',
			visibleArea : '1x6',
			history     : true,
			onThumb     : function(thumb) {}
		};

		// extend the options
		var opts = $.extend({},defaults, options);
		
		// build element specific options taking Metadata plugin in count
		var _o = $.meta ? $.extend({}, opts, _div.data()) : opts;
		$$.onThumb = _o.onThumb;
		
		//construct a reference for the caller div
		var _div = $(this);
		
		// add pirolleria class
		_div.addClass('pirolleria');
		
		// hide the container div (better performace for DOM manipulation) and iterate through the images
		// I've heard discussions about visibility and display here - gotta research what is best practice
		_div.css('display','none');
		
		// load the JSONs
		$.getJSON(_o.json, function(data) {
			$.getJSON(data.itemList, function(itemList) {
				// Todo: This .each should be a function once we will call it avery time we need
				//       to draw a new page, I suppose...
				$.each(itemList.items, function(i, item) {

					// fetch the JSON attributes
					var _title	= item.title;
					var _alt		= item.alt;
					var _src		= item.src;
					var _json	= item.json;
					
					// create the thumb element, hide it, and append it to the container
					var _thumb = $(document.createElement('img')).attr('src',_src).attr('alt',_alt).addClass('thumb').appendTo(_div);
					
					// hover classes for IE6
					_thumb.hover(
						function() { $(this).addClass('hover'); },
						function() { $(this).removeClass('hover'); }
					);
					
					// call the onThumb function
					_o.onThumb(jQuery(_thumb));
					
					// add the click functionality to the _thumb
					_thumb.click(function() {
						$$.activate(_thumb);
					});
					
				}); //each(items)
			}); //getJSON(itemList)
		}); //getJSON(json)
		
		// unhide the container div
		_div.css('display','inline');
	};
	
	$$.activate = function(_thumb) { 

		if (_thumb) {
			
			// new hash location
			//if ($.pirolleria.history) {
			//	window.location = window.location.href.replace(/\#.*/,'') + '#' + _src;
			//}

			// alter the active classes
			_thumb.siblings('.active').removeClass('active');
			_thumb.addClass('active');
			
			// call the onThumb method
			$$.onThumb(_thumb);

		} else {

			// remove active classes
			//$('.pirolleria img.active').removeClass('active');
		}
		
		// set the current thumb
		$$.current = _thumb;
		
	};

})(jQuery);