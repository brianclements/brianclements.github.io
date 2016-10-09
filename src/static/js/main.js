/***********************************/
/* Utils */
/***********************************/
var screen = (function() {
    var Mobile = window.matchMedia('(max-width: 767px)').matches;
    var LargerThanMobile = window.matchMedia('(min-width: 768px)').matches;
    var SmallerThanLarge = window.matchMedia('(max-width: 991px)').matches;
    var Large = window.matchMedia('(min-width: 992px)').matches;

    function isMobile(){
        return window.matchMedia('(max-width: 767px)').matches;
    }

    function isLargerThanMobile() {
        return LargerThanMobile = window.matchMedia('(min-width: 768px)').matches;
    }

    function isSmallerThanLarge() {
        return window.matchMedia('(max-width: 991px)').matches;
    }

    function isLarge() {
        return window.matchMedia('(min-width: 992px)').matches;
    }
    return {
        isMobile: isMobile,
        isLargerThanMobile: isLargerThanMobile,
        isSmallerThanLarge: isSmallerThanLarge,
        isLarge: isLarge
    }
})();

/* On Final Event
    * Runs callback after event firing stops (ie, resize).
    * via: http://stackoverflow.com/a/4541963/2607578  */
var onFinalEvent = (function() { 
    var timers = {};
    return function(callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = 'd3af5772-8bff-4754-8c54-c124c9fadd41';
        }
        if (ms === undefined) {
            ms = 500;
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

function getPageName() {
    return window.location.pathname.split('/')[1].split('.')[0];
}

function getTagName() {
    return window.location.pathname.split('/')[2].split('.')[0];
}
/***********************************/
/* Page Modifications */
/***********************************/
function columnizeArticles() {
    var pageName = getPageName();

    function applyColumnize() {
        $("#content > #content-posts-section").addClass("make-article-parent-flex-wrap");
        $("#content > #content-posts-section > article").each(function() {
            $(this).addClass("make-article-half-size");
        });
    }

    if ((screen.isLargerThanMobile()) && (pageName.includes('blog-index'))) {
        applyColumnize();
    }
    if ((screen.isLargerThanMobile()) && (pageName == 'bio')) {
        applyColumnize();
    }
    if ((screen.isLargerThanMobile()) && (pageName == 'urp')) {
        applyColumnize();
    }

    if (screen.isMobile()) {
        $("#content > #content-posts-section").removeClass("make-article-parent-flex-wrap");
        $("#content > #content-posts-section > article").each(function() {
            $(this).removeClass("make-article-half-size");
        });
    }
}

function hideBanner() {
    $("#banner-image").css("display", "none");
    $("header.navbar").css("min-height", "0");
    $("body header .container-nav .banner-div").addClass("shrink-banner-div");
    $("body header .container-nav").addClass("shrink-container-nav");
}

function hideTwitter() {
    $("#twitter-div").addClass("hidden");
}

function hideTags() {
    $("#tags-div").addClass("hidden");
    // $("#tags-dropdown").removeClass("hidden-md hidden-lg").appendTo("#main-top-left-nav");
}

function showHideBlogTagsDropdown() {
    var pageName = getPageName();
    if ((screen.isLarge()) && (pageName != 'blog')) {
        $("#blog-tags-dropdown-menu").addClass("hidden");
        $("#blog-nav-item").removeClass("hidden");
    }
    if ((screen.isSmallerThanLarge()) || (pageName == 'blog')) {
        $("#blog-tags-dropdown-menu").removeClass("hidden");
        $("#blog-nav-item").addClass("hidden");
    }
}

function toggleBlogNavItemActive() {
    var pageName = getPageName();

    if (screen.isMobile()) {
        $("#blog-tags-dropdown-menu > a").removeClass("active");
        $("#blog-nav-item").removeClass("active");
    } else {
        if (pageName.includes('blog-index')) {
            if (screen.isLarge()) {
                $("#blog-nav-item").addClass("active");
                $("#blog-tags-dropdown-menu > a").removeClass("active");
            }
            if (screen.isSmallerThanLarge()) {
                $("#blog-nav-item").removeClass("active");
                $("#blog-tags-dropdown-menu > a").addClass("active");
            }
        } else {
            switch(pageName) {
                case 'tags':
                    if (screen.isLarge()) {
                        $("#blog-nav-item").addClass("active");
                        $("#blog-tags-dropdown-menu > a").removeClass("active");
                    }
                    if (screen.isSmallerThanLarge()) {
                        $("#blog-nav-item").removeClass("active");
                        $("#blog-tags-dropdown-menu > a").addClass("active");
                    }
                    break;
                case 'blog':
                    $("#blog-tags-dropdown-menu > a").addClass("active");
                    break;
            }
        }
    }
}

function toggleAboutNavDropdownActive() {
    if (screen.isLargerThanMobile()) {
        $("#about-dropdown-menu > a").addClass("active");
    }
    if (screen.isMobile()) {
        $("#about-dropdown-menu > a").removeClass("active");
    }
}

function toggleLessonNavDropdownActive() {
    if (screen.isLargerThanMobile()) {
        $("#lessons-dropdown-menu > a").addClass("active");
    }
    if (screen.isMobile()) {
        $("#lessons-dropdown-menu > a").removeClass("active");
    }
}

function toggleCalendarNavItemActive() {
    if (screen.isLargerThanMobile()) {
        $("#calendar-nav-item").addClass("active");
    }
    if (screen.isMobile()) {
        $("#calendar-nav-item").removeClass("active");
    }
}


function toggleContactNavItemActive() {
    if (screen.isLargerThanMobile()) {
        $("#contact-nav-item").addClass("active");
    }
    if (screen.isMobile()) {
        $("#contact-nav-item").removeClass("active");
    }
}

function toggleProjectsNavItemActive() {
    var tagName = getTagName();
    
    if (screen.isLargerThanMobile()) {
        switch(tagName) {
            case 'urp':
                $("#projects-dropdown-menu > a").addClass("active");
                $("#blog-tags-dropdown-menu > a").removeClass("active");
                $("#blog-nav-item").removeClass("active");
                break;
            case 'blue_smoke':
                $("#projects-dropdown-menu > a").addClass("active");
                $("#blog-tags-dropdown-menu > a").removeClass("active");
                $("#blog-nav-item").removeClass("active");
                break;
            case 'motif':
                $("#projects-dropdown-menu > a").addClass("active");
                $("#blog-tags-dropdown-menu > a").removeClass("active");
                $("#blog-nav-item").removeClass("active");
                break;
        }
    } else if (screen.isMobile()) {
        $("#projects-dropdown-menu > a").removeClass("active");
    }
}

function fixCodePreSpaces() {
    $(".source pre").each(function(){
        var html = $(this).html();
        var pattern = html.match(/\s*\n[\t\s]*/);
        $(this).html(html.replace(new RegExp(pattern, "g"),'\n'));
    });
    $("pre code").each(function(){
        var html = $(this).html();
        var pattern = html.match(/\s*\n[\t\s]*/);
        $(this).html(html.replace(new RegExp(pattern, "g"),'\n'));
    });
}

function addContentHeading(heading) {
    $("#content").prepend('<h2 class="content-section-h2"></h2>');
    $("#content > .content-section-h2").html(heading);
}

function moveBannerPictureAboveTitle() {
    e = $("img[src*='banner']").removeClass("img-float-left")
    if (e.hasClass("img-urp-banner")) {
        e.prependTo("#content-posts-section > .post-article")
    } else {
        e.prependTo("#content-posts-section")
    }
}

function centerPaginationControls() {
    $("#content-posts-section > footer").appendTo("#content")
}

function centerImagesInParagraphs() {
    $("img").each(function() {
        $(this).parent("p").css("text-align", "center");
    });
}

function centerTextForUrpPost() {
    if ($("img[src*='urban-renewal-project']").length) {
        $("article.post-article").css("text-align", "center");
    }
}
/***********************************/
/* Events */
/***********************************/

function bindEvents() {
    $(window).on('resize', function() {
        onFinalEvent(
            function() {
                columnizeArticles();
                showHideBlogTagsDropdown();
                toggleBlogNavItemActive();
            },
            500,
            'resizeEvents'
        );
    });
}

/***********************************/
/* Main */
/***********************************/
var main = function() {
    var pageName = getPageName();

    bindEvents();
    showHideBlogTagsDropdown();
    fixCodePreSpaces();

    if (pageName.includes('blog-index')) {
        columnizeArticles();
        toggleBlogNavItemActive();
        addContentHeading("Recent Posts");
        centerPaginationControls();
    } else {
        switch(pageName) {
            case 'blog':
                hideBanner();
                hideTwitter();
                hideTags();
                $("#content").removeClass("col-md-7");
                toggleBlogNavItemActive();
                moveBannerPictureAboveTitle();
                centerImagesInParagraphs();
                centerTextForUrpPost();
                break;
            case 'urp':
                columnizeArticles();
                break;
            case 'bio':
                toggleAboutNavDropdownActive();
                // columnizeArticles();
                break;
            case 'statements':
                toggleAboutNavDropdownActive();
                break;
            case 'studio':
                $("#studio").addClass("hidden");
                toggleLessonNavDropdownActive();
                break;
            case 'testimonials':
                $("#testimonials").addClass("hidden");
                toggleLessonNavDropdownActive();
                break;
            case 'calendar':
                $("#calendar").addClass("hidden");
                toggleCalendarNavItemActive();
                break;
            case 'tags':
                toggleBlogNavItemActive();
                toggleProjectsNavItemActive();
                break;
            case 'contact':
                $("#contact").addClass("hidden");
                toggleContactNavItemActive();
                break;
        }
    }
}

/***********************************/
/* Runtime */
/***********************************/

$(document).ready(function() {
    'use strict';
    main();
});
