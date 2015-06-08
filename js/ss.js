/*====================================
 =        BEFORE DOM READY            =
 ====================================*//* ---------- GENERAL ---------- */// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
function is_touch_device() {
    return "ontouchstart"in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
}
function viewport() {
    var e = window, t = "inner";
    if (!("innerWidth"in window)) {
        t = "client";
        e = document.documentElement || document.body
    }
    return {width: e[t + "Width"], height: e[t + "Height"]}
}
function getMobileOperatingSystem() {
    var e = navigator.userAgent || navigator.vendor || window.opera;
    return e.match(/iPad/i) || e.match(/iPhone/i) || e.match(/iPod/i) ? "iOS" : e.match(/iPad/i) ? "iPad" : e.match(/iPhone/i) ? "iPhone" : e.match(/Android/i) ? "Android" : "unknown"
}
function positionSubmenu() {
    jQuery(".menu-item-has-children").on("mouseenter", function () {
        var e = jQuery(this), t = e.children(".children"), n = t.offset().left, r = t.outerWidth(), i = ww - (n + r);
        i < 0 && e.children(".children").css({right: "100%", left: "auto"})
    })
}
function findPositionX() {
    var e = null;
    if (!t)var t = window.event;
    t.pageX ? e = t.pageX : t.clientX && (e = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
    return e
}
function cosmoSendMail(e, t) {
    jQuery("#cosmo-name").removeClass("invalid");
    jQuery("#cosmo-email").removeClass("invalid");
    jQuery(t).html("");
    jQuery.ajax({
        url: ajaxurl,
        data: "&action=cosmoSendContact&" + jQuery(e).serialize(),
        type: "POST",
        dataType: "json",
        success: function (n) {
            if (n.contact_name) {
                jQuery("#cosmo-name").addClass("invalid");
                jQuery(t).append(n.contact_name)
            }
            if (n.contact_email) {
                jQuery("#cosmo-email").addClass("invalid");
                jQuery(t).append(n.contact_email)
            }
            if (n.message) {
                jQuery(".flo-modal").fadeIn("slow");
                jQuery(e).find('input[type="text"], textarea').val("");
                setTimeout(function () {
                    jQuery(".flo-modal").fadeOut("slow")
                }, 3e3)
            }
        }
    })
}
jQuery(document).foundation();
var win = jQuery(window), ww = win.width(), wh = win.height(), $page = jQuery("#page"), $body = jQuery("body"), resizeTimer, vpW = viewport().width, vpH = viewport().height;
jQuery(document).ready(function () {
    function u() {
        if (!jQuery(".header-logo-center.user-enabled").length)return !1;
        var e = jQuery(".header-logo-center .nav-menu"), t = e.children("ul"), n = t.children("li"), r = t.children(".logo-inside"), i = function () {
            var i, s, o, u, a, f, l, c, h = 0;
            if (viewport().width > 768) {
                i = parseInt(e.outerWidth());
                s = parseInt(t.outerWidth());
                o = parseInt(r.outerWidth());
                u = Math.floor(t.offset().left);
                a = Math.floor(viewport().width - (u + s));
                f = Math.floor(r.offset().left);
                l = Math.floor(win.width() / 2);
                c = Math.floor(l - (f + o / 2));
                for (var p = 0, d = n.length; p < d; p++) {
                    var v = parseInt(n.eq(p).css("margin-left")), m = parseInt(n.eq(p).css("margin-right")), g = parseInt(n.eq(p).outerWidth());
                    h += v + m + g
                }
                if (h >= i) {
                    t.animate({opacity: 1}).css("visibility", "visible");
                    t.css({left: "auto"});
                    return
                }
                t.animate({left: c}, function () {
                    t.animate({opacity: 1}).css("visibility", "visible")
                })
            }
        };
        win.on("resize", function () {
            o && clearTimeout(o);
            o = setTimeout(function () {
                var e = viewport().width, n = vpW;
                if (n > 768 && e > 768 || n < 769 && e < 769)return !1;
                n > 768 && e < 769 ? t.css({left: "auto"}) : n < 769 && e > 768 && i()
            }, 100)
        });
        i()
    }

    function a() {
        var e = jQuery(".header-hamburger");
        e.length && jQuery(".header-hamburger .nav-menu .js-open-primary-navigation").on("click", function () {
            if (vpW < 769)return !1;
            e.toggleClass("nav-menu-visible")
        })
    }

    function l() {
        var e = jQuery(".mobile-menu-simple .site-header .nav-menu > ul"), t = jQuery(".nav-scrollbar"), n = {
            includePadding: !0,
            suppressScrollX: !0,
            maxScrollbarLength: 100
        };
        if (vpW < 769) {
            e.perfectScrollbar(n);
            t.perfectScrollbar(n)
        } else {
            e.perfectScrollbar("destroy");
            t.perfectScrollbar("destroy")
        }
    }

    function E() {
        var e = jQuery(".menu-item-has-children > a"), t = jQuery(".menu-item-has-children .children");
        Modernizr.touch ? e.on("touchend", function (e) {
            var t = jQuery(this), n = t.siblings(".children"), r = t.parent().siblings(), i = jQuery(".menu-item-has-children").find(".menu-item-has-children"), s = viewport().width;
            if (jQuery(".children").is(":animated"))return !1;
            if (s < 769) {
                if (t.hasClass("clicked-once")) {
                    if (jQuery(e.target).is(".submenu-toggle")) {
                        t.parent().removeClass("active");
                        t.parent().children(".children").slideUp(600, function () {
                            t.removeClass("clicked-once");
                            t.siblings(".children").find(".children").slideUp(600);
                            t.siblings(".children").find(".clicked-once").removeClass(".clicked-once");
                            t.parent().find(".menu-item-has-children").removeClass("active")
                        });
                        return !1
                    }
                    t.removeClass("clicked-once");
                    return !0
                }
                r.length > 0 && r.each(function () {
                    var e = jQuery(this);
                    if (e.has(".clicked-once")) {
                        e.children(".clicked-once").removeClass("clicked-once");
                        e.children(".children").slideUp(600, function () {
                            e.children(".children").find(".children").slideUp();
                            e.children(".children").find(".clicked-once").removeClass("clicked-once");
                            e.children(".children").find(".children").parent().removeClass("active")
                        })
                    }
                });
                n.slideDown(600);
                t.parent().siblings().removeClass("active");
                t.parent().addClass("active");
                t.addClass("clicked-once");
                e.preventDefault()
            } else if (s > 768 && s < 1025) {
                if (t.hasClass("clicked-once")) {
                    t.removeClass("clicked-once");
                    return !0
                }
                r.length > 0 && r.each(function () {
                    var e = jQuery(this);
                    if (e.has(".clicked-once")) {
                        e.children(".clicked-once").removeClass("clicked-once");
                        e.children(".children").fadeOut(function () {
                            e.children(".children").find(".children").fadeOut();
                            e.children(".children").find(".clicked-once").removeClass("clicked-once")
                        })
                    }
                });
                n.fadeIn();
                t.addClass("clicked-once");
                e.preventDefault()
            }
        }) : e.on("click", function (e) {
            var t = jQuery(this), n = t.siblings(".children"), r = t.parent().siblings(), i = jQuery(".menu-item-has-children").find(".menu-item-has-children"), s = viewport().width;
            if (jQuery(".children").is(":animated"))return !1;
            if (s < 769) {
                if (t.hasClass("clicked-once")) {
                    if (jQuery(e.target).is(".submenu-toggle")) {
                        t.parent().removeClass("active");
                        t.parent().children(".children").slideUp(600, function () {
                            t.removeClass("clicked-once");
                            t.siblings(".children").find(".children").slideUp(600);
                            t.siblings(".children").find(".clicked-once").removeClass(".clicked-once");
                            t.parent().find(".menu-item-has-children").removeClass("active")
                        });
                        return !1
                    }
                    t.removeClass("clicked-once");
                    return !0
                }
                r.length > 0 && r.each(function () {
                    var e = jQuery(this);
                    if (e.has(".clicked-once")) {
                        e.children(".clicked-once").removeClass("clicked-once");
                        e.children(".children").slideUp(600, function () {
                            e.children(".children").find(".children").slideUp();
                            e.children(".children").find(".clicked-once").removeClass("clicked-once");
                            e.children(".children").find(".children").parent().removeClass("active")
                        })
                    }
                });
                n.slideDown(600);
                t.parent().siblings().removeClass("active");
                t.parent().addClass("active");
                t.addClass("clicked-once");
                e.preventDefault()
            }
        });
        win.on("resize", function () {
            clearTimeout(window.resizedFinished);
            window.resizedFinished = setTimeout(function () {
                e.unbind("touchend click");
                E()
            }, 100)
        })
    }

    function S() {
        jQuery("body").removeClass("is-open-mobile-menu");
        jQuery(".clicked-once").removeClass("clicked-once");
        jQuery(".menu-item-has-children.active").removeClass("active");
        jQuery(".children").removeAttr("style")
    }

    function T() {
        if (!jQuery(".gallery-simple").length)return !1;
        var e = jQuery(".site-header .sticky"), t = jQuery(".gallery-simple .gallery-wrap"), n = jQuery(".gallery-simple .gallery-description-inner"), r = jQuery(".gallery-simple .gallery-description"), i = parseInt(viewport().height - jQuery(".site-header").outerHeight());
        if (viewport().width > 1024) {
            var s = parseInt(e.outerHeight()), o = {top: 0, containerSelector: t, minWidth: 1024};
            r.css("height", i).fadeIn().pin(o);
            n.perfectScrollbar({
                suppressScrollX: !0,
                maxScrollbarLength: 100,
                wheelPropagation: !0,
                swipePropagation: !0,
                useKeyboard: !0,
                includePadding: !0
            });
            jQuery(window).bind("scroll", function () {
                if (jQuery(window).scrollTop() >= jQuery(t).outerHeight() - jQuery(window).height()) {
                    r.css("top", jQuery(t).outerHeight() - jQuery(window).height() + s);
                    r.css("position", "absolute");
                    return !1
                }
            })
        } else {
            r.css("height", "auto");
            n.perfectScrollbar("destroy")
        }
    }

    function N() {
        var e = jQuery(".single-post .post-article"), t = jQuery(".post-article .socials"), n = jQuery(".single-post #content"), r = "has-post-sharing", i = "socials-invisible", s = "sticky-element";
        if (jQuery(".single-post").length > 0) {
            if (vpW < 767) {
                n.removeClass(r);
                t.addClass(i)
            } else {
                imagesLoaded(n, function () {
                    t.pin({minWidth: 767, containerSelector: n})
                });
                n.addClass(r);
                t.removeClass(i)
            }
            jQuery(window).on("scroll", function () {
                t.addClass(i);
                n.removeClass(r)
            })
        }
    }

    function k(e, t) {
        var n = jQuery(e + " div").length;
        jQuery(e + " div:eq(" + t + ")").css("display", "block").animate({opacity: 1}, 600).animate({opacity: 1}, C).animate({opacity: 0}, 800, function () {
            t + 1 === n ? t = 0 : t++;
            jQuery(this).css("display", "none").animate({opacity: 0}, 10);
            k(e, t)
        })
    }

    jQuery(".widget-box .hover").each(function () {
        jQuery(this).hover(function () {
            jQuery(this).parents("div.post-preview-inner").find(".post-preview-hidden h3").css("display", "none")
        }, function () {
            jQuery(this).parents("div.post-preview-inner").find(".post-preview-hidden h3").css("display", "block")
        })
    });
    var e = parseInt(slideshow_autoplay);
    jQuery("p").each(function () {
        var e = jQuery(this);
        e.html().replace(/\s|&nbsp;/g, "").length == 0 && e.css("margin", 0)
    });
    jQuery("#homepage-slider .see-more").click(function () {
        var e = jQuery("#page"), t = e.offset(), n = parseInt(jQuery("#homepage-slider").css("margin-bottom")), r = parseInt(jQuery("#homepage-slider").css("padding-bottom")), i = t.top - n - r;
        jQuery("html, body").animate({scrollTop: i}, 500)
    });
    var t;
    main_slideshow_show_arrow == "no" ? t = !1 : t = !0;
    var n = jQuery("#homepage-slider .royalSlider").fadeIn().royalSlider({
        autoScaleSlider: !0,
        imageScaleMode: "fill",
        imageScalePadding: 0,
        arrowsNav: t,
        slidesSpacing: 0,
        usePreloader: !0,
        loop: !0,
        loopRewind: !0,
        slidesOrientation: main_slideshow_bullets_position,
        keyboardNavEnabled: !0,
        autoplay: {enabled: e, pauseOnHover: !0, delay: main_slideshow_autoplay_dalay},
        video: {autoHideArrows: !0, autoHideControlNav: !0, autoHideBlocks: !0}
    }).data("royalSlider");
    if (jQuery("#homepage-slider").length) {
        n.ev.on("rsAfterContentSet", function (e, t) {
            var n = jQuery("#homepage-slider .rsSlide");
            n.each(function () {
                var e = jQuery(this), t = e.find(".rsVideoContainer"), n = e.find(".caption");
                e.has(n).length && jQuery(this).find(".rsBtnCenterer").appendTo(n)
            })
        });
        n.ev.on("rsVideoPlay", function () {
            jQuery("#homepage-slider .royalSlider").css("z-index", 100)
        });
        n.ev.on("rsVideoStop", function () {
            jQuery("#homepage-slider .royalSlider").css("z-index", "auto")
        })
    }
    content_down_slider_desctop ? content_down_slider_desctop = parseInt(content_down_slider_desctop) : content_down_slider_desctop = 600;
    var r = jQuery("#simple-slider .royalSlider").fadeIn().royalSlider({
        autoScaleSlider: !0,
        autoScaleSliderWidth: 1200,
        autoScaleSliderHeight: content_down_slider_desctop,
        imageScalePadding: 0,
        arrowsNav: !0,
        arrowsNavAutoHide: !1,
        slidesSpacing: 0,
        keyboardNavEnabled: !0,
        imageScaleMode: "fit",
        addActiveClass: !0,
        loop: !0
    }), i = {bg: "#000000", target: "", id: "nanobarr"}, s = new Nanobar(i);
    if (jQuery(".gallery-open").length > 0) {
        s.go(30);
        jQuery(".content").css("background", "white");
        jQuery(".content").css("opacity", "0");
        setTimeout(function () {
            s.go(100)
        }, 1e3);
        setTimeout(function () {
            jQuery(".content").show("slow", function () {
                jQuery(".content").css("background", "inherit");
                jQuery(".content").css("opacity", "1")
            })
        }, 1500)
    }
    jQuery("#line-slider").slick({
        accessibility: !0,
        dots: !1,
        slidesToShow: 1,
        centerMode: !0,
        variableWidth: !0,
        lazyLoad: "progressive",
        infinite: !0,
        slidesToShow: 1,
        responsive: [{breakpoint: 1024, settings: {slidesToShow: 3}}, {
            breakpoint: 768,
            settings: {slidesToShow: 2}
        }, {breakpoint: 481, settings: {arrows: !1}}]
    }).fadeIn();
    jQuery("#visited .royalSlider").fadeIn().royalSlider({
        autoScaleSlider: !0,
        autoScaleSliderWidth: 1200,
        autoScaleSliderHeight: 500,
        imageScaleMode: "fill",
        imageScalePadding: 0,
        arrowsNav: !0,
        arrowsNavAutoHide: !1,
        slidesSpacing: 0,
        keyboardNavEnabled: !0,
        controlNavigation: "none"
    });
    var o;
    u();
    a();
    positionSubmenu();
    var f = '<span class="submenu-toggle">+</span>';
    jQuery(".menu-item-has-children").each(function () {
        jQuery(this).children("a").append(f)
    });
    l();
    var c = jQuery(".mobile-menu-offset"), h = jQuery(".mobile-menu-fullscreen"), p = jQuery(".mobile-menu-corner"), d = jQuery(".mobile-menu-simple"), v = jQuery(".mobile-logo-top"), m = jQuery(".offset-menu"), g = jQuery(".header-inner .nav-wrapper"), y = g.find(".menu-toggle"), b = m.find(".menu-toggle"), w = y.height();
    jQuery(".menu-toggle").on("click", function () {
        if (vpW > 768)return !1;
        var e = jQuery(this).offset().top, t = jQuery(this).offset().left, n = e - w, r = jQuery(".site-header-wrap"), i = jQuery(".site-header-wrap").css("padding-bottom");
        c.length || h.length;
        p.length && g.css("top", n);
        if (d.length) {
            var s = r.outerHeight(), o = parseInt(g.children(".nav-menu").css("padding-top"));
            g.children(".nav-menu").css("margin-top", i);
            g.find(".nav-menu").css("max-height", vpH - s);
            g.find(".nav-menu > ul").css("left") && g.find(".nav-menu > ul").removeAttr("style");
            jQuery(".no-scroll").length ? $body.removeClass("no-scroll") : $body.addClass("no-scroll")
        }
        jQuery("body").toggleClass("is-open-mobile-menu");
        jQuery(".is-open-mobile-menu").length || S()
    });
    E();
    S();
    var x = jQuery(".js-masonry");
    x.each(function () {
        x.hide().imagesLoaded(function () {
            x.fadeIn(1e3).isotope({itemSelector: ".post-preview", layoutMode: "packery"})
        })
    });
    jQuery(".js-back-to-top").scrollToHref();
    jQuery(".comment-item").scrollToHref();
    jQuery(".see-also-link").scrollToHref();
    jQuery(".lazy").lazyload({threshold: 200, effect: "fadeIn"});
    jQuery(window).resize(jQuery.debounce(500, T));
    T();
    jQuery(".thumb-pagination").length && jQuery(".thumb-pagination").thumbPagination(".prev-post", ".next-post");
    jQuery(".search-toggle a").on("click", function () {
        jQuery(".header-search").show().find(".input").focus();
        jQuery("body").addClass("no-scroll")
    });
    jQuery(".header-search").on("click", function (e) {
        target = jQuery(e.target);
        if (!target.closest(".header-search form").length || target.is(".header-search .icon-close")) {
            jQuery(".header-search").hide().find(".input").val("");
            jQuery("body").removeClass("no-scroll")
        }
    });
    jQuery(".post-article .socials .social-top").on("click", function (e) {
        e.stopPropagation();
        jQuery(this).parent().toggleClass("socials-invisible");
        jQuery(".single-post #content").toggleClass("has-post-sharing")
    });
    N();
    jQuery.fn.extend({
        psRightSpace: function (e) {
            return this.each(function () {
                var t = jQuery(this), n = e ? e : 20;
                t.is(".ps-active-y") && t.css({"padding-right": n})
            })
        }
    });
    jQuery(".topbox-scrollbar").perfectScrollbar({includePadding: !0, suppressScrollX: !0, maxScrollbarLength: 100});
    jQuery(".close-topbox").on("click", function () {
        jQuery("#topbox").addClass("closed");
        jQuery(".flo-overlay").removeClass("open");
        $body.removeClass("no-scroll")
    });
    jQuery(".flo-overlay").on("click", function () {
        var e = jQuery("#topbox");
        e.is(":visible") && e.addClass("closed");
        jQuery(this).removeClass("open");
        $body.removeClass("no-scroll")
    });
    jQuery(".open-topbox").on("click", function () {
        jQuery("#topbox").removeClass("closed");
        jQuery(".flo-overlay").addClass("open");
        $body.addClass("no-scroll");
        setTimeout(function () {
            jQuery(".topbox-scrollbar").perfectScrollbar("update")
        }, 400)
    });
    jQuery(window).on("resize", function () {
        resizeTimer && clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            ww = jQuery(window).width(), vpW = viewport().width, vpH = viewport().height;
            positionSubmenu();
            vpW > 768 && S();
            l();
            N();
            jQuery(".topbox-content").perfectScrollbar("update")
        }, 100)
    });
    jQuery("a[data-fancybox-group^='prettyPhoto']").length > 0 && jQuery("a[data-fancybox-group^='prettyPhoto']").fancybox({
        padding: 0,
        openEffect: "elastic",
        openSpeed: 150,
        closeEffect: "elastic",
        closeSpeed: 150,
        closeClick: !0
    });
    jQuery(".flo-social-hover").hover(function () {
        jQuery(this).data("imghover") != "" && jQuery(this).attr("src", jQuery(this).data("imghover"))
    }, function () {
        jQuery(this).attr("src", jQuery(this).data("imgoriginal"))
    });
    var C = 4e3;
    jQuery(".tweets").each(function (e, t) {
        var n = jQuery(t).parent().attr("id"), r = "#" + n + " .tweets .dynamic .flo_twitter .slides_container";
        k(r, 0)
    })
});
jQuery.fn.stickyElements = function () {
    return this.each(function () {
        var e = jQuery(this), t = e.offset().top, n = 0, r = "sticky-element", i = null, s = jQuery(window).scrollTop();
        if (jQuery(".sticky").length > 0) {
            n = parseInt(jQuery(".site-header").outerHeight());
            t -= n
        }
        jQuery(window).scroll(function () {
            s = jQuery(window).scrollTop();
            s > t && vpW > 767 ? e.addClass(r).css("top", n).slideDown(1e3) : e.removeClass(r).removeAttr("style")
        });
        jQuery(window).on("resize", function () {
            e.removeAttr("style");
            e.trigger("stickyElements")
        })
    })
};
jQuery.fn.thumbPagination = function (e, t, n) {
    var r = this.find(e), i = this.find(t), s = jQuery("#page"), o = n || 200;
    s.on("mousemove", function (e) {
        var t = findPositionX();
        if (t < o)jQuery(r).addClass("show-pagination"); else if (t > ww - o)jQuery(i).addClass("show-pagination"); else {
            jQuery(r).removeClass("show-pagination");
            jQuery(i).removeClass("show-pagination")
        }
    })
};
jQuery.fn.scrollToHref = function () {
    var e = 40;
    jQuery(".sticky").length > 0 && (e = parseInt(jQuery(".site-header").outerHeight()));
    return this.each(function () {
        var t = jQuery(this);
        t.on("click", function (n) {
            n.preventDefault();
            var r = t.attr("href"), i = jQuery(r).offset(), s = i.top - e;
            jQuery("html, body").animate({scrollTop: s}, 400)
        })
    })
};
jQuery(document).ready(function () {
    var e = parseInt(flo_js_data.sticky_header_height), t = jQuery(".header-box").outerHeight(), n = jQuery(document).height(), r = jQuery(window).height(), i = 0, s = function () {
        var t = jQuery(window).scrollTop();
        if (t > e) {
            jQuery(".header-box").hide();
            jQuery(".header-box").addClass("sticky");
            jQuery(".header-box").addClass("fixed");
            console.log(i);
            i != 1 ? jQuery(".header-box").slideDown(parseInt(flo_js_data.sticky_header_slidedown_delay)).show() : jQuery(".header-box").show();
            i = 1
        } else {
            jQuery(".header-box").removeClass("sticky");
            jQuery(".header-box").removeClass("fixed");
            i = 0
        }
    };
    jQuery(".has_sticky").length > 0 && n > r + e && s();
    jQuery(window).scroll(function () {
        jQuery(".has_sticky").length > 0 && n > r + e && s()
    });
    if (ww > 1024) {
        var o = jQuery(".header-box").outerHeight;
        jQuery(".has_sticky").length > 0 && jQuery(".gallery-description").css("top", o)
    }
});