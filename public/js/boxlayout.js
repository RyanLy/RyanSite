/**
 * boxlayout.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
 
// Modified to supports page hashes, so changes in the url hash automatically switches to the correct panel.
// Heavily modified to remove a lot of unused things.
var Boxlayout = (function() {

	var $el = $( '#bl-main' ),
		  $sections = $el.children( 'section' );

	function init() {
		initEvents();
	}

	function initEvents() {
		
		$sections.each( function() {
			
			var $section = $( this );

			$section.on( 'click', function() {
				var panelNumber = $(this).data('panel');
				
				if (panelNumber !== 2) {
          location.hash = '#' + panelNumber;
				}

			} ).find( 'span.bl-icon-close' ).on( 'click', function(event) {
        location.hash = '#';
				// Prevent bottom sections from being clicked
				event.stopPropagation();
			} );

		} );

		function openPanel(panelNumber) {
			if (panelNumber > 0 && panelNumber < 7) {
				var panelNumber = location.hash.substr(location.hash.length - 1);
				var targetedSection = $("section[data-panel='" + panelNumber + "']")[0];
				var $targetedSection = $(targetedSection);
				
				if (!$targetedSection.data( 'open' ) && $targetedSection.attr("id") != 'middle' ) {
					$targetedSection.data( 'open', true ).addClass( 'bl-expand bl-expand-top' );
					$el.addClass( 'bl-expand-item' );	
				}
			}
		}

		window.onhashchange = function(event) {
			var panelNumber = location.hash.substr(1, location.hash.length);
      console.log(panelNumber);
			
			$sections.each( function() {
				var $section = $( this );
				$section.data( 'open', false ).removeClass( 'bl-expand' ).removeClass( 'bl-expand-top' );
			});

			$el.removeClass( 'bl-expand-item' );
			
			openPanel(panelNumber);
		}
		
		window.onload = function() {
      var panelNumber = location.hash.substr(1, location.hash.length);
		  openPanel(panelNumber);
		}
	}

	return { init : init };

})();
