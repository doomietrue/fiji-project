// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

jQuery(document).ready(function ($) {
    var $slider_node = $('#slider-container .royalSlider'),
        $slider;


    $slider = $slider_node.royalSlider({
        autoScaleSlider: true,
        imageScaleMode: "fill",
        imageScalePadding: 0,
        arrowsNav: true,
        slidesSpacing: 0,
        usePreloader: true,
        loop: true,
        loopRewind: true,
        slidesOrientation: "horizontal",
        keyboardNavEnabled: true,
        autoplay: {enabled: 1, pauseOnHover: true, delay: 6000},
        video: {autoHideArrows: true, autoHideControlNav: true, autoHideBlocks: true}
    }).data('royalSlider');

    if (jQuery("#slider-container").length) {
        $slider.ev.on("rsAfterContentSet", function (e, t) {
            var n = jQuery("#homepage-slider .rsSlide");
            n.each(function () {
                var e = jQuery(this), t = e.find(".rsVideoContainer"), n = e.find(".caption");
                e.has(n).length && jQuery(this).find(".rsBtnCenterer").appendTo(n)
            })
        });
        $slider.ev.on("rsVideoPlay", function () {
            jQuery("#homepage-slider .royalSlider").css("z-index", 100)
        });
        $slider.ev.on("rsVideoStop", function () {
            jQuery("#homepage-slider .royalSlider").css("z-index", "auto")
        })
    }


    $("#see-more-button").click(function () {
        var $content = $("#content"),
            offset = $content.offset(),
            margin = parseInt($("#slider-container").css("margin-bottom")),
            padding = parseInt($("#slider-container").css("padding-bottom")),
            scroll = offset.top - margin - padding;

        $("html, body").animate({scrollTop: scroll}, 500)
    });

    $('#back-top').on("click", function (e) {
        e.preventDefault();
        var $header_offset = jQuery('#header').offset(),
            scrollTo = $header_offset.top - 40;
        $("html, body").animate({scrollTop: scrollTo}, 400)
    });

    $('[data-toggle-menu]').on('click', function () {
        $('body').toggleClass('opened-off-canvas-menu')
    });

});


