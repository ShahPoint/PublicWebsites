//jQuery code
jQuery(function($) {

    'use strict';

    // Preloader
    $(window).on('load', function () {
        $('#page-preloader').delay(1000).fadeOut('slow');
    });


    // Navigation Icon
    $('.nav-icon').on('click', function () {
        $(this).toggleClass('open');
    });

    if ($(window).width() <= 768) {
        // Navigation Collapse
        $('.dropdown-menu').on('click', function () {
            $('.navbar-collapse').removeClass('in');
            $('.nav-icon').toggleClass('open');
        });
        $('li > a.simple-link').on('click', function () {
            $('.navbar-collapse').removeClass('in');
            $('.nav-icon').toggleClass('open');
        });
    }

    if ($(window).width() >= 768) {
        initBootstrapHoverDropdown();
    }

    initNavBg();
    initAOS();
    initPartnersSlider();
    initVideo();
    initParallaxBg();
    initIndexSlider();
    initContact();
    initNewsletter();
    initNewsletterInHeader();
    trialSubmission();
    slideOut();
    careerSubmission();

});

// Dropdown header menu
function initBootstrapHoverDropdown() {
    $('.bs-dropdown').dropdownHover().dropdown();
}

// Navigation background 
function initNavBg() {

    var nav = $('.container-nav');

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 0) {
            nav.removeClass('nav-no-shadow').addClass('nav-shadow');
        }
        else if ($(this).scrollTop() <= 0) {
            nav.removeClass('nav-shadow').addClass('nav-no-shadow');
        }
    });
}

// Animate elements
function initAOS() {
    AOS.init({
        duration: 700,
        delay: 100,
        once: true,
        disable: function () {
            var maxWidth = 420;
            return window.innerWidth < maxWidth;
        }
    });
}

// Init Video
function initVideo() {
    $('.popup-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
}

// Partners
function initPartnersSlider() {
    $(".partners-slider").owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        responsive:{
            0:{
                items:2
            },
            767:{
                items:3
            },
            1199:{
                items:6
            }
        }
    });
}

// Init Parallax
function initParallaxBg() {
    $('.download-parallax').parallax('50%', 0.2);
}

// Slider
function initIndexSlider() {
    $(".index-slider").owlCarousel({
        loop: true,
        center: true,
        margin: 0,
        dots: false,
        nav: true,
        responsive:{
            0:{
                items:2
            },
            767:{
                items:3
            },
            1199:{
                items:5
            }
        }
    });
}

// Email Validate
function validateEmail(email) {
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
}

// Contact Form Validation
function initContact() {

    var contact_form = $('#contact-form');
    var contact_button = $('#contact-button');
    var contact_f_name = $('#contact-f-name');
    var contact_l_name = $('#contact-l-name');
    var contact_email = $('#contact-email');
    var contact_message = $('#contact-message');

    contact_form.submit(function() { return false; });
    contact_button.on('click', function(){

        // first name
        var firstnameval = contact_f_name.val();
        var firstnamelen = firstnameval.length;

        if(firstnamelen < 1) {
            contact_f_name.addClass('field-error');
        }
        else if(firstnamelen >= 1){
            contact_f_name.removeClass('field-error');
        }

        // last name
        var lastnameval = contact_l_name.val();
        var lastnamelen = lastnameval.length;

        if(lastnamelen < 1) {
            contact_l_name.addClass('field-error');
        }
        else if(lastnamelen >= 1){
            contact_l_name.removeClass('field-error');
        }

        // email
        var emailval   = contact_email.val();
        var emailvalid = validateEmail(emailval);
        if(emailvalid === false) {
            contact_email.addClass('field-error');
        }
        else if(emailvalid === true){
            contact_email.removeClass('field-error');
        }

        // message
        var messageval = contact_message.val();
        var messagelen = messageval.length;

        if(messagelen < 1) {
            contact_message.addClass('field-error');
        }
        else if(messagelen >= 1){
            contact_message.removeClass('field-error');
        }

        if(firstnamelen >= 1 && lastnamelen >= 1 && emailvalid === true && messagelen >= 1) {
            contact_button.replaceWith("<span class='form-send form-send-white'>send...</span>");
            $.ajax({
                type: 'POST',
                url: 'contact.php',
                data: contact_form.serialize(),
                success: function(data) {
                    if(data === 'true') {
                        contact_form.fadeOut('fast', function(){
                            $(this).before("<p class='contact-send'>Thank you!</p>");
                        });
                    }
                }
            });
        }
    });
}

// Newsletter Form Validation
function initNewsletter() {

    var contact_form = $('#newsletter-form');
    var contact_button = $('#newsletter-submit');
    var contact_email = $('#newsletter-email');

    contact_form.submit(function() { return false; });
    contact_button.on('click', function(){

        // email
        var emailval   = contact_email.val();
        var emailvalid = validateEmail(emailval);
        if(emailvalid === false) {
            contact_button.addClass('newsletter-field-error');
        }
        else if(emailvalid === true){
            contact_button.removeClass('newsletter-field-error');
        }

        if(emailvalid === true) {
            contact_button.replaceWith("<span class='form-send'>send...</span>");
            $.ajax({
                type: 'POST',
                url: 'newsletter.php',
                data: contact_form.serialize(),
                success: function(data) {
                    if(data === 'true') {
                        contact_form.fadeOut('fast', function(){
                            $(this).before("<p class='newslatter-send'>Thank you!</p>");
                        });
                    }
                }
            });
        }
    });
}

// Newsletter Form Validation (in header)
function initNewsletterInHeader() {

    var contact_form = $('#header-newsletter-form');
    var contact_button = $('#header-newsletter-submit');
    var contact_email = $('#header-newsletter-email');

    contact_form.submit(function() { return false; });
    contact_button.on('click', function(){

        // email
        var emailval   = contact_email.val();
        var emailvalid = validateEmail(emailval);
        if(emailvalid === false) {
            contact_button.addClass('newsletter-field-error');
        }
        else if(emailvalid === true){
            contact_button.removeClass('newsletter-field-error');
        }

        if(emailvalid === true) {
            contact_button.replaceWith("<span class='form-send'>send...</span>");
            $.ajax({
                type: 'POST',
                url: 'header-newsletter.php',
                data: contact_form.serialize(),
                success: function(data) {
                    if(data === 'true') {
                        contact_form.fadeOut('fast', function(){
                            $(this).before("<p class='header-send'>Thank you!</p>");
                        });
                    }
                }
            });
        }
    });
}

function trialSubmission(){

    var trialForm = jQuery('.free-trial-form');
    trialForm.each(function(){
        jQuery(this).validate({
            rules: {
                phone:{
                    required: true,
                    phoneUS: true
                }
            }
        });
    });

    trialForm.on('submit', function(e){
        e.preventDefault();

        var $this = jQuery(this);
        if($this.valid()){
            var data = $this.serialize();

            jQuery.ajax({
                url: 'mail.php',
                type: 'POST',
                data: data,
                success: function(e){

                    if(e === 'true'){
                        $this.find('input:not([type=submit])').each((i, e) => {
                            jQuery(e).val('');
                        });
                        $this.before('<p class="header-send">Thank you!</p>');
                    }
                }
            })
        }
    });
}

function careerSubmission(){

    var trialForm = jQuery('#career-contact');

    trialForm.validate({
        rules: {
            phone:{
                required: true,
                phoneUS: true
            }
        }
    });

    trialForm.on('submit', function(e){
        e.preventDefault();

        var $this = jQuery(this);
        if($this.valid()){
            var data = $this.serialize();

            jQuery.ajax({
                url: 'contact.php',
                type: 'POST',
                data: data,
                success: function(e){
                    if(e === 'true'){
                        $this.find('input:not([type=submit])').each((i, e) => {
                           jQuery(e).val('');
                        });
                        $this.before('<p class="header-send">Thank you!</p>');
                    }
                }
            })
        }
    });
}

function slideOut(){
    //Call to Action slide out

    var minusDefault = '-40%',
        positiveDefault = '40%',
        side = 0, cal = '40%',
        windowWidth = jQuery(window).width(),
        flyout = jQuery('.side-fly-out'),
        sideTab = jQuery('.side-tab');

    if(windowWidth <= 767){
        minusDefault = '-100%';
        positiveDefault = '100%';
        cal = '100%';
        flyout.css('right', minusDefault);
        flyout.append('<div class="exit-image"><i class="fas fa-times"></i></div>');
    }else{
        minusDefault = '-40%',
            positiveDefault = '40%',
            side = 0, cal = '40%';
    }
    jQuery(window).on('resize', function(e) {
        windowWidth = $(window).width();

        if(windowWidth <= 767){
            minusDefault = '-100%';
            positiveDefault = '100%';
            cal = '100%';
            flyout.css('right', minusDefault);
            flyout.append('<div class="exit-image"><i class="fas fa-times"></i></div>');
        }else{
            minusDefault = '-40%',
                positiveDefault = '40%',
                side = 0, cal = '40%';
            jQuery('.exit-image').remove();
        }
    });

    jQuery('body').on('click', '.exit-image', function(){
        flyout.animate({right: side},{
            duration: 300,
            step: function(){
                jQuery(this).removeClass('shadow');
            }
        });
        sideTab.animate({right : cal}, 300);
        side = 0;
        cal = positiveDefault;
    });
    jQuery('.side-tab, a.fly-out').on('click', function(e){
        e.preventDefault();

        if(side == minusDefault && cal == 0){
            flyout.animate({right: side},{
                duration: 300,
                step: function(){
                    sideTab.removeClass('shadow');
                }
            });
            sideTab.animate({right : cal}, 300);
            side = 0;
            cal = positiveDefault;
        }else{
            flyout.animate({right: side}, 300);
            sideTab.animate({right : cal}, 300);
            flyout.addClass('shadow');
            side = minusDefault;
            cal = 0;
        }
    });
    jQuery(window).on('scroll', function(){
        if(side == minusDefault && cal == 0){
            flyout.animate({right: side},{
                duration: 300,
                step: function(){
                    jQuery(this).removeClass('shadow');
                }
            });
            sideTab.animate({right : cal}, 300);
            side = 0;
            cal = positiveDefault;
        }
    });

}