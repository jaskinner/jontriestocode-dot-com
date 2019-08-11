
(function($){

    "use strict";

    /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- */

    $(window).on('load', function() {

        if($('div').is('.page-loader')) {
            $('.page-loader').delay(500).fadeOut(800);
        }

    });

    $(document).ready(function() {

        var header             = $('.header'),
            one_page_nav       = $('.onepage-nav'),
            background         = $('[data-background], .slides-container li'),
            margin_y           = $('[data-mY]');

        /* ---------------------------------------------- /*
         * Collapse navbar on click
        /* ---------------------------------------------- */

        $(document).on('click', '.inner-navigation.show', function(e) {
            if ( $(e.target).is('span') && !$(e.target).parent().parent().hasClass('menu-item-has-children') ) {
                $(this).collapse('hide');
            }
        });

        /* ---------------------------------------------- /*
         * One Page Nav
        /* ---------------------------------------------- */

        $('a', one_page_nav).filter(function() {
            if ($(this).is(':not([href^="#"])')) {
                $(this).addClass('external');
            }
        });

        one_page_nav.singlePageNav({
            filter:       ':not(.external)',
            currentClass: 'active',
            offset:       '58',
        });

        /* ---------------------------------------------- /*
         * Header animation
        /* ---------------------------------------------- */

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll >= 5) {
                header.addClass('header-small');
                header.addClass('header-shadow');
            } else {
                header.removeClass('header-small');
                header.removeClass('header-shadow');
            }
        }).scroll();

        /* ---------------------------------------------- /*
         * Setting background of modules
        /* ---------------------------------------------- */

        background.each(function() {
            if ($(this).attr('data-gradient') == 1) {
                $(this).append('<div class="overlay-background overlay-gradient"></div>');
                $(this).find('.overlay-background').css('opacity', $(this).attr('data-overlay'));
            } else if ($(this).attr('data-overlay') > 0) {
                $(this).append('<div class="overlay-background"></div>');
                $(this).find('.overlay-background').css('opacity', $(this).attr('data-overlay'));
            }
        });

        background.each(function() {
            $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
        });

        margin_y.each(function() {
            $(this).css('margin-top', $(this).attr('data-mY') );
        });

        /* ---------------------------------------------- /*
         * Scroll top
        /* ---------------------------------------------- */

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-top').addClass('scroll-top-visible');
            } else {
                $('.scroll-top').removeClass('scroll-top-visible');
            }
        });

        $('a[href="#top"]').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });

        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - -  /*
        /* Portfolio masonry
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

        var filters    = $('.filters'),
            worksgrid = $('.row-portfolio');

        $('a', filters).on('click', function() {
            var selector = $(this).attr('data-filter');
            $('.current', filters).removeClass('current');
            $(this).addClass('current');
            worksgrid.isotope({
                filter: selector
            });
            return false;
        });

        $(window).on('resize', function() {
            worksgrid.imagesLoaded(function() {
                worksgrid.isotope({
                    layoutMode: 'masonry',
                    itemSelector: '.portfolio-item',
                    transitionDuration: '0.4s',
                    masonry: {
                        columnWidth: '.grid-sizer',
                    },
                });
            });
        });

        AOS.init()

    });

})(jQuery);
