/*
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
*/

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

		// plugin defaults
		var defaults = {
			json        : 'data/galeria.json',
			visibleArea : '1x6',
			history     : true,
			onThumb     : function(thumb) {}
		};

		// extend the options
		var opts = $.extend({},defaults, options);

		_div = $(this);
			
		// build element specific options taking Metadata plugin in count
		var _o = $.meta ? $.extend({}, opts, _div.data()) : opts;
	};

})(jQuery);