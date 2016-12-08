// Scroll
var currentP = 0;
var stickyOffset = 0;
if(jQuery('.header-sticky').length > 0){
    stickyOffset = jQuery('.mk-nav').offset().top;
    stickyOffset += jQuery('.mk-nav').outerHeight();
}

jQuery(window).scroll(function(){
    var headerH = jQuery('.mk-nav').height();
    var scrollP = jQuery(window).scrollTop();

    if(scrollP > stickyOffset){            
        jQuery('.mk-nav').addClass('ontop');           
    } else {            
        jQuery('.mk-nav').removeClass('ontop show');
    }
});