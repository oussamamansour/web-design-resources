// Custom scrollbar
/*$(function() {  
    $("body").niceScroll({
        cursorcolor:'#d50014',
        cursorwidth:"12px",
        cursorborder:'none',
        cursorborderradius:'6px',
        zindex:"999",
        enablemousewheel: true,
        smoothscroll: true,
        hwacceleration: true,
        scrollspeed:30
    });
});*/
/*$('body').optiscroll({
    wrapContent: true
});*/

$(function() {
    //The passed argument has to be at least a empty object or a object with your desired options
    $('body').overlayScrollbars({
        className : "os-theme-dark",
        scrollbars: {
            autoHide: "move",
            autoHideDelay: 400,
        }
    });
});

// Clicking on scroll button scrolls to top
var scrollBtn = document.querySelector(".scrollTopBtn");
var viewport = document.querySelector('.os-viewport');

window.onload = () => {
    document.querySelector('.os-viewport').onscroll = function() {
        if (document.querySelector('.os-viewport').scrollTop > 400 || document.querySelector('.os-viewport').scrollTop > 400) {
            scrollBtn.removeAttribute("disabled")
        } else {
            scrollBtn.setAttribute("disabled","true")
        }
    };
}



function scrollToTop() {
    document.querySelector('.os-viewport').scroll({ top: 0, left: 0, behavior: 'smooth' });
}