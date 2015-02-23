var demo = demo || {}; // demo parent namespace
demo.ui = demo.ui || {}; // demo.ui namespace

demo.ui.Operations = (function () {
    "use strict";

    var handledByTap = false;
    var handledByClick = false;
    var tooltipTargetId = "#push-notification-help";
    var bodyElement = document.getElementsByTagName("body");
    var hammertime = Hammer(bodyElement[0]);

    // method of this singleton class
    //
    var setActiveNavItem = function () {

        var $navbarHome = $("#navbar-home");
        var $navbarAbout = $("#navbar-about");

    	var navItems = [$navbarHome, $navbarAbout ];

    	if (window.location.pathname.match(/Home\/About\/?/)) {
    		setActiveClass(navItems, $navbarAbout);
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

    var clickHandler = function (e) {

        $("body").off("click", demo.ui.Operations.BodyClickHandler);

        if (handledByTap) {

            handledByTap = false;
            return;
        }

        if (e.target.id != tooltipTargetId.slice(1)) {

            $(tooltipTargetId).popoverextended("hide");
            handledByClick = true;
        }

    };

    var tapHandler = function (e) {

        hammertime.off("tap", demo.ui.Operations.TapHandler);

        if (handledByClick) {

            handledByClick = false;
            return;
        }

        if (e.target.id != tooltipTargetId.slice(1)) {

            $(tooltipTargetId).popoverextended("hide");
            handledByTap = true;
        }

    };

    // accessible to consumer ...
    //
    return {
        SetActiveNavItem: setActiveNavItem,
        BodyClickHandler: clickHandler,
        HammerTime: hammertime,
        TapHandler: tapHandler,
        TooltipTargetId: tooltipTargetId
    };
})();

$(document).ready(function () {

    var notifyOptionsPanel = "#push-notification-options";

    demo.ui.Operations.SetActiveNavItem();

    if (window.location.href.match(/\/Home\/About\/?$/)) {

        $(notifyOptionsPanel).html('<h1 class="no-inline">Oh, yeah.  About this demo ...</h1>');

    } else {

        kendo.data.Operations.PersonGridInit();
        configureEditsTooltip(demo.ui.Operations.TooltipTargetId + "|click");
        kendo.data.Operations.RefreshGrid();

    }

    $('[name="show-current-user-updates-switch"]').bootstrapSwitch();

    function configureEditsTooltip(trigger) {

        var i = 0;
        var splitResult = trigger.split("|");
        var len = splitResult.length;

        while (i < len) {

            var j = i + 1;

            $(splitResult[i]).popoverextended({
                "placement": "right", "trigger": splitResult[j], "title": "Hint", "html": true, "content": function (callback, extensionRef) {

                    $("body").on("click", demo.ui.Operations.BodyClickHandler);
                    demo.ui.Operations.HammerTime.on("tap", demo.ui.Operations.TapHandler);

                    $.getJSON("/Home/FetchTooltipContent", function (fetchedData) {
                        callback(extensionRef, fetchedData);
                    });

                }
            });

            i += 2;
        }
    }

    $('figure img').mousedown(function(e) {

        $(this).fadeTo(0, 0.60);
    });

});