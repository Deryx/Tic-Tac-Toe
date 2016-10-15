(function ( $ ) {
 
    $.fn.showlightbox = function() {
		var sectionHeight = $(document).height();
		var sectionWidth = $(window).width;

	    $( '#site-overlay' ).css( 'height', sectionHeight).fadeIn();
	};
	
	$.fn.closelightbox = function() {
		$( '[id*=lightbox]' ).fadeOut();
		$( '#site-overlay' ).fadeOut();
	};
}( jQuery ));