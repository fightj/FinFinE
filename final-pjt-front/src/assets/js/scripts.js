/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {
    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;

    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    if (menuToggle) {  // Add null check
        menuToggle.addEventListener('click', event => {
            event.preventDefault();
            if (sidebarWrapper) {  // Add null check for sidebarWrapper
                sidebarWrapper.classList.toggle('active');
            }
            _toggleMenuIcon();
            menuToggle.classList.toggle('active');
        });
    }

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.forEach(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            if (sidebarWrapper) {  // Add null check for sidebarWrapper
                sidebarWrapper.classList.remove('active');
            }
            if (menuToggle) {  // Add null check for menuToggle
                menuToggle.classList.remove('active');
            }
            _toggleMenuIcon();
        });
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (scrollToTop) {  // Add null check for scrollToTop
            if (document.documentElement.scrollTop > 100) {
                if (!scrollToTopVisible) {
                    fadeIn(scrollToTop);
                    scrollToTopVisible = true;
                }
            } else {
                if (scrollToTopVisible) {
                    fadeOut(scrollToTop);
                    scrollToTopVisible = false;
                }
            }
        }
    });
});

function fadeOut(el) {
    if (!el) return;  // Add null check for el
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= 0.1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

function fadeIn(el, display) {
    if (!el) return;  // Add null check for el
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += 0.1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}
