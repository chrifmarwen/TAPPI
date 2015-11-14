jQuery(document).ready(function ($) {

    //Add new anchor in meain menu has-child items and make new anchor clickable
    // $( ".cd-secondary-nav > .has-children .has-children > a").not('.submenu-trigger').after( "<a class='submenu-trigger' href='#'><i class='fa fa-angle-right'></i></a>");
    //$('.submenu-trigger').bind('click',function(e){
    //    e.preventDefault();
    //});

    //Hide Image slide change arrows if number of slider is less than 2  
    var flexslider = $('.flexslider');
    var flexslider_items = $('.flexslider .slides > li').length;
    if(flexslider_items < 2){
        flexslider.find('.flex-control-nav').hide();
    }

    initializeSlider();

    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    var MqL = 992;
    //move nav element position according to window width
    moveNavigation();
    $(window).on('resize', function () {
        //(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 500) : window.requestAnimationFrame(moveNavigation);
        moveNavigation();
    });

    //mobile - open lateral menu clicking on the menu icon
    $('.cd-nav-trigger, .cd-nav-trigger-2, .cd-nav-trigger3').on('click', function (event) {
        event.preventDefault();
        if ($('.cd-main-content').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
            $(".cd-nav-trigger3").show();
        } else {
            $(this).addClass('nav-is-visible');
            $('.cd-primary-nav').addClass('nav-is-visible');
            $('.cd-main-header').addClass('nav-is-visible');
            $('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                $('body').addClass('overflow-hidden');
            });
            $("#cd-primary-nav > .has-children > a.submenu-trigger.hidden").removeClass('hidden');
            $(".cd-nav-trigger3").hide();
            toggleSearch('close');
            $('.cd-overlay').addClass('is-visible');
        }
    });

    //open search form
    $('.cd-search-trigger').on('click', function (event) {
        event.preventDefault();
        toggleSearch();
        closeNav();
    });

    //close lateral menu on mobile 
    $('.cd-overlay').on('swiperight', function () {
        if ($('.cd-primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        }
    });
    $('.nav-on-left .cd-overlay').on('swipeleft', function () {
        if ($('.cd-primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        }
    });
    $('.cd-overlay').on('click', function () {
        closeNav();
        toggleSearch('close')
        $('.cd-overlay').removeClass('is-visible');
    });

    //prevent default clicking on direct children of .cd-primary-nav 
    $('.cd-primary-nav').children('.has-children').children('a').on('click', function (event) {
        event.preventDefault();
    });

    //open submenu
    $('.has-children').children('a').on('click', function (event) {
        if (!checkWindowWidth()) event.preventDefault();
        var selected = $(this);
        if (selected.next('ul').hasClass('is-hidden')) {
            //desktop version only
            selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
            selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
            if(selected.hasClass('submenu-trigger'))
                selected.addClass('hidden');
            selected.parent('.has-children').siblings('.has-children').children('a.submenu-trigger').addClass('hidden');
            $('.cd-overlay').addClass('is-visible');
        } else {
            selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
            $('.cd-overlay').removeClass('is-visible');
        }
        toggleSearch('close');
    });

    //submenu items - go back link
    $('.go-back').on('click', function () {
        $(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
        $(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').children('li').children('a.submenu-trigger').removeClass('hidden');
    });


    function closeNav() {
        $('.cd-nav-trigger').removeClass('nav-is-visible');
        $('.cd-main-header').removeClass('nav-is-visible');
        $('.cd-primary-nav').removeClass('nav-is-visible');
        $('.has-children ul').addClass('is-hidden');
        $('.has-children a').removeClass('selected');
        $('.moves-out').removeClass('moves-out');
        $('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            $('body').removeClass('overflow-hidden');
        });
    }

    $('body').click(function (e) {
        var navigationToAvoid = $('nav');
        var windowWidth = $(window).width();
        if (windowWidth > 991 && !navigationToAvoid.is(e.target) && navigationToAvoid.has(e.target).length === 0) {
            closeNav();
        }
    });




    function toggleSearch(type) {
        if (type == "close") {
            //close serach 
            $('.cd-search').removeClass('is-visible');
            $('.cd-search-trigger').removeClass('search-is-visible');
            $('.cd-overlay').removeClass('search-is-visible');
        } else {
            //toggle search visibility
            $('.cd-search').toggleClass('is-visible');
            $('.cd-search-trigger').toggleClass('search-is-visible');
            $('.cd-overlay').toggleClass('search-is-visible');
            if ($(window).width() > MqL && $('.cd-search').hasClass('is-visible')) $('.cd-search').find('input[type="search"]').focus();
            ($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible');
        }
    }



    function checkWindowWidth() {
        //check window width (scrollbar included)
        var e = window,
            a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if (e[a + 'Width'] >= MqL) {
            return true;
        } else {
            return false;
        }
    }

    function moveNavigation() {
        var navigation = $('.cd-nav');
        var desktop = checkWindowWidth();
        if (desktop) {
            navigation.detach();
            navigation.insertBefore('.cd-header-buttons');
            $('.cd-nav').slice(1).remove();
        } else {
            navigation.detach();
            navigation.insertAfter('.cd-main-content');
            $('.cd-nav').slice(1).remove();
        }
    }
});


$(function () {
    $('.action-button-area').click(function () {
        var theNewsContainerToShow = $(this).parent().prev();
        var sliderArea = $('.slider-area');
        var takeActionLinks = $('.take-action');
        var sliderAreaControls = $('.flex-control-nav, .flex-direction-nav');


        var slideDownAll = function () {
            $('.action-button-area').removeClass('stuckUp');
            $(".news-container").removeClass('newsItemOpen');
            takeActionLinks.unbind();
            sliderAreaControls.removeClass('hidden');
        }

        if (theNewsContainerToShow.hasClass('newsItemOpen')) {
            slideDownAll();
            sliderArea.fadeTo('slow', 1);
        }
        else {
            slideDownAll();
            $(this).addClass('stuckUp');
            theNewsContainerToShow.addClass('newsItemOpen');
            sliderAreaControls.addClass('hidden');
            takeActionLinks.bind('click', function (event) {
                event.preventDefault();
            });
            sliderArea.fadeTo('slow', .33);
        }
    });
});


/*other doc ready stuff*/
$(function () {
    /*not for home page*/
    $('.slide-link-down').click(function () {
        $('.card-content-sub').slideToggle('3000');
    });

    $('.slide-link-down-1').click(function () {
        $('.card-content-sub-1').slideToggle('3000');
    });
});


//only initialize slider if there is more than 1 slide
var initializeSlider = function () {

    if ($('.flexslider').length > 0) {

        $('.flexslider').flexslider({
            animation: "fade",
        });
    }
}