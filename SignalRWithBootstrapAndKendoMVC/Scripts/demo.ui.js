var demo = demo || {}; // demo parent namespace
demo.ui = demo.ui || {}; // demo.ui namespace

demo.ui.Operations = (function () {
    "use strict";

    // method of this singleton class
    //
    var setActiveNavItem = function () {

        var $navbarHome = $("#navbar-home");
    	var $navbarAbout = $("#navbar-about");
    	var $navbarContact = $("#navbar-contact");

    	var navItems = [$navbarHome, $navbarAbout, $navbarContact];

    	if (window.location.pathname.match(/Home\/About/)) {
    		setActiveClass(navItems, $navbarAbout);
    	} else if (window.location.pathname.match(/Home\/Contact/)) {
    		setActiveClass(navItems, $navbarContact);
    	} else {
    		setActiveClass(navItems, $navbarHome);
    	}
    };

    var setActiveClass = function (navItems, activeNavItem) {

    	for (var i = 0; i < navItems.length; i++) {

    		var currentItem = navItems[i];

    		if (currentItem === activeNavItem) {
    			$(currentItem).addClass("active");
    		} else {
    			$(currentItem).removeClass("active");
    		}
    	}
    };

    // accessible to consumer ...
    //
    return {
        SetActiveNavItem: setActiveNavItem
    };
})();

$(document).ready(function () {

    var tooltipTargetId = "#push-notification-help";
    var bodyElement = document.getElementsByTagName("body");
    var hammertime = Hammer(bodyElement[0]);
    var handledByTap = false;
    var handledByClick = false;

    kendo.data.Operations.PersonGridInit();
    demo.ui.Operations.SetActiveNavItem();
    configureEditsTooltip(tooltipTargetId + "|click");
    kendo.data.Operations.RefreshGrid();

    function configureEditsTooltip(trigger) {

        var i = 0;
        var splitResult = trigger.split("|");
        var len = splitResult.length;

        while (i < len) {

            var j = i + 1;

            $(splitResult[i]).popoverextended({
                "placement": "right", "trigger": splitResult[j], "title": "Hint", "html": true, "content": function (callback, extensionRef) {

                    $.getJSON("/Home/FetchTooltipContent", function (fetchedData) {
                        callback(extensionRef, fetchedData);
                    });

                }
            });

            i += 2;
        }
    }

    $("body").on("click", function (e) {

        if (handledByTap) {

            handledByTap = false;
            return;
        }

        handledByClick = true;

        if (e.target.id != tooltipTargetId.slice(1)) {

            $(tooltipTargetId).popoverextended("hide");
        }
    });

    hammertime.on("tap", function (e) {

        if (handledByClick) {

            handledByClick = false;
            return;
        }

        handledByTap = true;

        if (e.target.id != tooltipTargetId.slice(1)) {

            $(tooltipTargetId).popoverextended("hide");
        }
    });


    $('figure img').mousedown(function(e) {

        $(this).fadeTo(0, 0.60);
    });

});