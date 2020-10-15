$(document).ready(function() {
    $("#light-slider").lightSlider({
        item: 1,
        autoWidth: false,
        slideMove: 1, // slidemove will be 1 if loop is true
        slideMargin: 0,

        addClass: '',
        mode: "slide",
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
        easing: 'linear', //'for jquery animation',////

        speed: 400, //ms'
        auto: false,
        pauseOnHover: false,
        loop: true,
        slideEndAnimation: true,
        pause: 2000,

        keyPress: true,
        controls: true,
        prevHtml: '<i class="fas fa-angle-left display-4"></i>',
        nextHtml: '<i class="fas fa-angle-right display-4"></i>',

        rtl:false,
        adaptiveHeight:false,

        vertical:false,
        verticalHeight:500,
        vThumbWidth:100,

        thumbItem:10,
        pager: true,
        gallery: false,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: 'middle',

        enableTouch:true,
        enableDrag:true,
        freeMove:true,
        swipeThreshold: 40,

        responsive : [],

        onBeforeStart: function (el) {},
        onSliderLoad: function (el) {},
        onBeforeSlide: function (el) {},
        onAfterSlide: function (el) {},
        onBeforeNextSlide: function (el) {},
        onBeforePrevSlide: function (el) {}
    });
});