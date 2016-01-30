(function($) {
 "use strict";

    // Page Preloader
    $(window).load(function() {
        $(".loader").delay(300).fadeOut();
        $(".animationload").delay(600).fadeOut("slow");
    });

    // BACK TO TOP
    jQuery('a.back-to-top').click(function(){
        jQuery('html, body').animate({scrollTop: '0px'}, 800);
        return false;
    });


})

})(jQuery);


