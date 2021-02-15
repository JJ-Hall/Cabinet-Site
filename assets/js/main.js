/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var images = document.querySelectorAll('.js-lazy-image');
      var config = {
        rootMargin: '50px 0px',
        threshold: 0.01
      };

      var imageCount = images.length;
      var observer;

      var fetchImage = function(url) {
        return new Promise(function(resolve, reject) {
          var image = new Image();
          image.src = url;
          image.onload = resolve;
          image.onerror = reject;
        });
      }

      var preloadImage = function(image) {
        var src = image.dataset.src;
        if (!src) {
          return;
        }

        return fetchImage(src).then(function(){ applyImage(image, src); });
      }

      var loadImagesImmediately = function(images) {
        for (image in images) {
          preloadImage(image);
        }
      }

      var onIntersection = function(entries) {
        if (imageCount === 0) {
          observer.disconnect();
        }

        for (entry in entries) {
          if (entry.intersectionRatio > 0) {
            imageCount--;

            observer.unobserve(entry.target);
            preloadImage(entry.target);
          }
        }
      }

      var applyImage = function(img, src) {
        img.classList.add('js-lazy-image--handled');
        img.src = src;
      }

      if (!('IntersectionObserver' in window)) {
        loadImagesImmediately(images);
      } else {
        observer = new IntersectionObserver(onIntersection, config);

        for (image in images) {
          var image = images[i];
          if (image.classList.contains('js-lazy-image--handled')) {
            continue;
          }

          observer.observe(image);
        }
      }

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

})(jQuery);