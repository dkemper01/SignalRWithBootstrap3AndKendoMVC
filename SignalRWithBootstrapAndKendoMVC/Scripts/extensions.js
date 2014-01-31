+function ($) {
    'use strict';

    // EXTENDED POPOVER PUBLIC CLASS DEFINITION
    // ===============================

    var PopoverExtended = function(element, options) {
        this.init('popoverextended', element, options);
    };

    if (!$.fn.tooltip) throw new Error('PopoverExtended requires tooltip.js');

    PopoverExtended.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover popover-pad"><h3 class="popover-title"></h3><div class="popover-content"></div><div class="arrow"></div></div>'
    });


    // NOTE: THIS CUSTOM POPOVER EXTENDS tooltip.js
    // ================================

    PopoverExtended.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);

    PopoverExtended.prototype.constructor = PopoverExtended;

    PopoverExtended.prototype.getDefaults = function() {
        return PopoverExtended.DEFAULTS;
    };

    PopoverExtended.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();

        this.getContent(function(thatRef, fetchedContent) {

            $tip.find('.popover-title')[thatRef.options.html ? 'html' : 'text'](title);
            $tip.find('.popover-content')[ // we use append for html objects to maintain js events
                thatRef.options.html ? (typeof fetchedContent == 'string' ? 'html' : 'append') : 'text'
            ](fetchedContent);

            $tip.removeClass('fade top bottom left right in');

            // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
            // this manually by checking the contents.
            if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();

        });
    };

    PopoverExtended.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    };

    PopoverExtended.prototype.getContent = function(callback) {
        var $e = this.$element;
        var o = this.options;

        return $e.attr('data-content')
            || (typeof o.content == 'function' ?
                o.content.call($e[0], callback, this) :
                o.content);
    };

    PopoverExtended.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find('.arrow');
    };

    PopoverExtended.prototype.tip = function() {
        if (!this.$tip) this.$tip = $(this.options.template);
        return this.$tip;
    };


    // EXTENDED POPOVER PLUGIN DEFINITION
    // =========================

    var old = $.fn.popoverextended;

    $.fn.popoverextended = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.popoverextended');
            var options = typeof option == 'object' && option;

            if (!data && option == 'destroy') return;
            if (!data) $this.data('bs.popoverextended', (data = new PopoverExtended(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.popoverextended.Constructor = PopoverExtended;


    // POPOVER NO CONFLICT
    // ===================

    $.fn.popoverextended.noConflict = function() {
        $.fn.popoverextended = old;
        return this;
    };

}(jQuery);