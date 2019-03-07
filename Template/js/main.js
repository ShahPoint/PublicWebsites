var dp = jQuery;
//dp.noConflict();
dp(document).ready(function() {
    //EXPANDING THUMBNAIL
    Grid.init();
    // Superslides fullscreen slider
    dp('#slides').superslides({
        animation: 'fade', // Choose between slide or fade
        play: 4000
    });
    dp('#slides_cs').superslides({
        animation: 'fade', // Choose between slide or fade
        play: 4000,
        pagination: false
    });
    //BACK TO TOP
    dp("#backtotop").backToTop();
    //PARALLAX
    dp('.bg-about').parallax("10%", 1);
    dp('.bg-skill').parallax("10%", 1);
    //VIDEO BACKGROUND
    var videobackground = new dp.backgroundVideo(dp('.bg-video'), {
        "align": "centerXY",
        "muted": "muted", // change value "muted" or "no"
        "width": 1280,
        "height": 720,
        "path": "video/",
        "filename": "steven",
        "types": ["mp4", "ogg", "webm"]
    });
    //TOOLTIP
    dp('a[data-toggle="tooltip"]').tooltip();
    //VIDEO INDEX
    var videobackground = new dp.backgroundVideo(dp('.home-video'), {
        "align": "centerXY",
        "muted": "muted", // change value "muted" or "no"
        "width": 1280,
        "height": 720,
        "path": "video/",
        "filename": "cloud",
        "types": ["mp4", "ogg", "webm"]
    });
    //NIVO LIGHTBOX
    dp('.popup').venobox();

    var sudoSlider = dp("#slider").sudoSlider({
        customLink: 'a.customLink',
        prevNext: false
    });

    //TESTIMONIAL SLIDER
    dp(".testimonial-slider").sudoSlider({
        customLink: '.testimonial-item > a',
        speed: 400,
        responsive: true,
        effect: "fadeOutIn",
        useCSS: true,
        continuous: true,
        prevNext: false,
        updateBefore: true
    });
    //ANIMATED OBJECT
    dp(".animatez").waypoint(function(direction) {
        var effect = dp(this).attr('data-effect');
        dp(this).removeClass('animatez');
        dp(this).addClass('animated ' + effect);
    }, {
        offset: '70%'
    });
    //ANIMATED SKILL BAR
    dp(".bar").waypoint(function(direction) {
        var value = dp(this).attr('data-value');
        dp(this).css({
            'width': value + '%'
        });
    }, {
        offset: '80%'
    });

    //COUNT UP ON SCREEN
    dp('.countTo').waypoint(function(direction) {
        dp('.countTo').countTo();
        dp('.countTo').removeClass('countTo');
        dp(this).removeClass('timer');
    }, {
        offset: "80%"
    });

    //SMOOTH SCROLL
    dp(".sscroll").smoothScroll();

    //FITVIDS
    dp(".responsive-video").fitVids();

    //BACKSTRETCH
    if(dp.fn.backstretch){
        var bg_image = dp(".home-image");
        var bg_image_src = bg_image.data("src");
        bg_image.backstretch(bg_image_src);
    }
    //COUNT DOWN COMING SOON
    if (dp.fn.countdown) {
        var endDate = "December 31, 2014  15:03:25"; // <-- Change to your date launch.
        dp('.countdown.styled').countdown({
            date: endDate,
            render: function(data) {
                dp(this.el).html("<div>" + this.leadingZeros(data.days, 3) + " <span>days</span></div><div>" + this.leadingZeros(data.hours, 2) + " <span>hrs</span></div><div>" + this.leadingZeros(data.min, 2) + " <span>min</span></div><div>" + this.leadingZeros(data.sec, 2) + " <span>sec</span></div>");
            }
        });
    }

    //HTML 5 Audio Player
    if (dp.fn.mediaelementplayer) {
        dp('audio , video').mediaelementplayer({
            loop: false,
            enableAutosize: false,
            features: ['playpause', 'progress', 'current', 'volume'],
            audioHeight: 40,
            alwaysShowHours: false

        });
    }
	
	//Contact Form
	function sentMessageAlert(result, name){
		dp('#submit').text('SUBMIT');
		dp('#contact-name').val('');
		dp('#contact-email').val('');
		dp('#contact-message').val('');
		dp('body').append('<div class="body-shadow"><div class="message-state"><img src="Template/images/end-button.png" class="end-button"></div></div>');
		var successMessage = "Your message was sent successfully and we will respond to your message within 24 hours.";
		
		dp('.message-state').append('<div class="message-thanks">Thank You ' + name +',</div><div class="message-results">' + successMessage + '</div>');		
		dp('.body-shadow').fadeIn(300);
		
		
		dp('body').css('overflow', 'hidden');
		dp('body').delegate('.end-button', 'click', function(){
			dp('.body-shadow').fadeOut(300, function(){dp(this).remove();});
			dp('body').css('overflow', 'auto');
		});
	}	

	
	
	
	
	dp("#emailContact").submit(function(){
		var info = dp(this).serialize();
		var name = dp('input[name=name]').val();
		dp('#submit').text('Sending...');
		
		
		dp.ajax({
			url : 'http://threesixfiveconsulting.com/Template/php/sendemail.php',
			dataType:"text",
			type: 'POST',
			crossDomain:true,
			data : info, 
			success : function(result){ 				
				
			},
			error : function(result){
				$('#error').fadeIn(300).delay(10000).fadeOut(300);
			}
		});	
		var result = 'success';
		sentMessageAlert(result, name);
		return false;
	});
	
	//Call to Action slide out
	
	var minusDefault = '-40%',
	positiveDefault = '40%',
	side = 0, cal = '40%', windowWidth = $(window).width();
	
	if(windowWidth <= 650){
		minusDefault = '-100%';
		positiveDefault = '100%';
		cal = '100%';
		dp('.calendar-tab').css('right', minusDefault);
		dp('.calendar-tab').append('<div class="exit-image"></div>');
	}else{
		minusDefault = '-40%',
		positiveDefault = '40%',
		side = 0, cal = '40%';
	}
	dp(window).resize(function(e) {
		windowWidth = $(window).width();
		console.log(windowWidth);
        if(windowWidth <= 650){
			minusDefault = '-100%';
			positiveDefault = '100%';
			cal = '100%';
			dp('.calendar-tab').css('right', minusDefault);
			dp('.calendar-tab').append('<div class="exit-image"></div>');
		}else{
		minusDefault = '-40%',
		positiveDefault = '40%',
		side = 0, cal = '40%';
		dp('.exit-image').remove();
	}
    });
	
	dp('body').delegate('.exit-image', 'click', function(){
		dp('.calendar-tab').animate({right: side},{
				duration: 300,
				step: function(){
					dp(this).removeClass('calendar-tab-shd');
				}
			});
			dp('.side-tab').animate({right : cal}, 300);
			side = 0;
			cal = positiveDefault;
	});
	dp('.side-tab').click(function(){		
		if(side == minusDefault && cal == 0){
			dp('.calendar-tab').animate({right: side},{
				duration: 300,
				step: function(){
					dp(this).removeClass('calendar-tab-shd');
				}
			});
			dp(this).animate({right : cal}, 300);
			side = 0;
			cal = positiveDefault;
		}else{
			dp('.calendar-tab').animate({right: side}, 300);
			dp(this).animate({right : cal}, 300);
			dp('.calendar-tab').addClass('calendar-tab-shd');
			side = minusDefault;
			cal = 0;
		}
	});
	dp(window).scroll(function(){
		if(side == minusDefault && cal == 0){
			dp('.calendar-tab').animate({right: side},{
				duration: 300,
				step: function(){
					dp(this).removeClass('calendar-tab-shd');
				}
			});
			dp('.side-tab').animate({right : cal}, 300);
			side = 0;
			cal = positiveDefault;
		}
	})
});
/*var container = document.querySelector('#portfoliomasonry');
var msnry = new Masonry(container, {
    itemSelector: '.portfolio-item',
    columnWidth: '.portfolio-item',
}); */
