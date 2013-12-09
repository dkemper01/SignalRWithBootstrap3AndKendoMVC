var demo = demo || {}; // demo parent namespace
demo.ui = demo.ui || {}; // demo.ui namespace

demo.ui.Operations = (function () {
    "use strict";

    // method of this singleton class
    //
    var setActiveNavItem = function () {

    	var $navbarHome = $("#navbar-home")
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

    kendo.data.Operations.PersonGridInit();
    demo.ui.Operations.SetActiveNavItem();
});