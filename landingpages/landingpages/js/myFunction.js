var isErs = getParameterByName("ers") == "true";

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function myFunction() {
    var agencyName = jQuery("#agencyName").val();
    var agencyState = jQuery("#agencyState").val();
    var firstName = jQuery("#firstName").val();
    var lastName = jQuery("#lastName").val();
    var email = jQuery("#email").val();
    var phone = jQuery("#phone").val();
    var myForm = jQuery("#myForm").val();
    var button = jQuery("button").val();
    var forceAgencyContact = !isErs;


    jQuery("#myForm").show();
    jQuery("#running").hide();
    jQuery("#features").show();
    jQuery("#signuphead").show();


    swal("One moment while we create your account!", {
        buttons: false,
    });


    if (email !== '' && agencyName !== '' && firstName !== '' && lastName !== '' && phone !== '' && agencyState !== '') {

        jQuery.ajax({
            type: "GET",
            url: "https://cloudpcrv3-dev.azurewebsites.net/Account/QuickCreateApi",
            data: {
                emailAddress: email,
                agencyName: agencyName,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
                state: agencyState,
                forceAgencyContact: forceAgencyContact,
                testing: false
            }
        }).done(function (dat) {
            //$("body").append($("<pre>" + JSON.stringify(dat, null, 2) + "</pre>"));


            if (dat.Success) {

                jQuery("#alive").hide();
                jQuery("#running").hide();
                jQuery("#myForm").hide();
                jQuery("#signuphead").hide();


                swal("Awesome!", "Welcome to the CloudPCR community! We will contact you soon to finalize your demo acount - until then, check your email for some helpful resources to get you started!", "success");

                return jQuery("#yay").show();


            } else

                swal("Oh Snap!", "Maybe you have already signed up?  You can create a new account by trying a different email address, or send us a message using our chat in the bottom right!", "warning");

            {
                jQuery("#alive").hide();
                jQuery("#running").hide();
                jQuery("#signuphead").show();
                jQuery("#myForm").show();
            }


        }).fail(function () {
            // a server error or something occurred
            jQuery("#alive").hide();
            jQuery("#oops").show();
        });

    } else {

        swal("Oops!", "There appears to be some information missing, please fill out the form completely", "warning");

        jQuery("#alive").hide();
        jQuery("#running").hide();
        jQuery("#myForm").show();
        jQuery('html, body').animate({
            scrollto: "#signup"
        }, 500);


        if (email == '') {
            jQuery("#email").css({
                'border-style': 'solid',
                'border-color': '#ff0000',
                'border-weight': '2px'
            });
        } else {
            jQuery("#email").removeAttr('style');
        }

        if (agencyName == '') {
            jQuery("#agencyName").css({
                'border-style': 'solid',
                'border-color': '#ff0000',
                'border-weight': '2px'
            });
        } else {
            jQuery("#agencyName").removeAttr('style');
        }

        if (firstName == '') {
            jQuery("#firstName").css({
                'border-style': 'solid',
                'border-color': '#ff0000',
                'border-weight': '2px'
            });
        } else {
            jQuery("#firstName").removeAttr('style');
        }

        if (lastName == '') {
            jQuery("#lastName").css({
                'border-style': 'solid',
                'border-color': '#ff0000',
                'border-weight': '2px'
            });
        } else {
            jQuery("#lastName").removeAttr('style');
        }

        if (phone == '') {
            jQuery("#phone").css({
                'border-style': 'solid',
                'border-color': '#ff0000',
                'border-weight': '2px'
            });
        } else {
            jQuery("#phone").removeAttr('style');
        }

        if (agencyState == '') {
            jQuery("#agencyState").css({
                'border-style': 'solid',
                'border-color': '#ff0000',
                'border-weight': '2px'
            });
        } else {
            jQuery("#agencyState").removeAttr('style');
        }


    }
}