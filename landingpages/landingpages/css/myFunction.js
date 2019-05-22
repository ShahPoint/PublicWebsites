function myFunction() {
              var agencyName = jQuery("#agencyName").val();
              var agencyState = jQuery("#agencyState").val();
              var firstName = jQuery("#firstName").val();
              var lastName = jQuery("#lastName").val();
              var email = jQuery("#email").val();
              var phone = jQuery("#phone").val();
              var myForm = jQuery("#myForm").val();
              var button = jQuery("button").val();
              
              
              jQuery("#myForm").hide();
              jQuery("#running").show();
              
              
              
              jQuery("#alive").show();
              
              
              if(email !== '' && agencyName !== '' && firstName !== ''&& lastName !== '' && phone !== '' && agencyState !== ''){
              
              jQuery.ajax({
              type: "GET",
              url: "https://cloudpcrv3.azurewebsites.net/Account/QuickCreateApi",
              data: {
              emailAddress: email,
              agencyName: agencyName,
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phone,
              state: agencyState
              }
              }).done(function (dat) {
              //$("body").append($("<pre>" + JSON.stringify(dat, null, 2) + "</pre>"));
              
              
              if(dat.Success)
              {
              
                 jQuery("#alive").hide();
                  jQuery("#running").show();
                  jQuery("myForm").hide();
              
              
              swal("Awesome!", "Welcome to the CloudPCR community, please check your e-mail for your log in information!", "success");
              
                return jQuery("#yay").show();
                  
              }
              
                
              
              else
              
              swal("Oh Snap!", "Maybe you have already signed up?  You can create a new account by trying a different email address, or send us a message using our chat in the bottom right!", "warning");
              
              {
                  jQuery("#alive").hide();
                  jQuery("#running").hide();
                  jQuery("#myForm").show();
              }
              
              
              }).fail(function () {
              // a server error or something occurred
                 jQuery("#alive").hide();
                 jQuery("#oops").show();
              });
              
              }else{
              
              swal("Oops!", "There appears to be some information missing, please fill out the form completely", "warning");
              
                jQuery("#alive").hide();
                  jQuery("#running").hide();
                  jQuery("#myForm").show();
                  jQuery('html, body').animate({scrollto : "#signup"}, 500);
                  
                  
                  if(email == ''){
                    jQuery("#email").css({'border-style': 'solid', 'border-color' : '#ff0000', 'border-weight' : '2px'});
                  }else{
                    jQuery("#email").removeAttr('style');
                  }
                  
                  if(agencyName == ''){
                    jQuery("#agencyName").css({'border-style': 'solid', 'border-color' : '#ff0000', 'border-weight' : '2px'});
                  }else{
                    jQuery("#agencyName").removeAttr('style');
                  } 
                  
                  if(firstName == ''){
                    jQuery("#firstName").css({'border-style': 'solid', 'border-color' : '#ff0000', 'border-weight' : '2px'});
                  }else{
                    jQuery("#firstName").removeAttr('style');
                  }
                  
                  if(lastName == ''){
                    jQuery("#lastName").css({'border-style': 'solid', 'border-color' : '#ff0000', 'border-weight' : '2px'});
                  }else{
                    jQuery("#lastName").removeAttr('style');
                  } 
                  
                  if(phone == ''){
                    jQuery("#phone").css({'border-style': 'solid', 'border-color' : '#ff0000', 'border-weight' : '2px'});
                  }else{
                    jQuery("#phone").removeAttr('style');
                  }
                  
                  if(agencyState == ''){
                    jQuery("#agencyState").css({'border-style': 'solid', 'border-color' : '#ff0000', 'border-weight' : '2px'});
                  }else{
                    jQuery("#agencyState").removeAttr('style');
                  }
              
                  
              }
              
                
              
              }