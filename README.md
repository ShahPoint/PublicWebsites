#User.com Control

##Curl Object
The communication between User.com and the website is handled within the curl_control.php file in the control folder. If changing account the token would need to be updated which would be found under the CURLOPT_HTTPHEADER.

`CURLOPT_HTTPHEADER => array(
 				"authorization: Token m1h1JjTwtln4GmmAQg2BbQBZHrMWkOvzg9edvgNvK4xYhGBnySGPh07VjWY2K5NW",
 				"content-type: application/json"
 			)` 
 			
##Updating Lists
If you would like to change the list where the user is added to there are two files that handle this for the various forms. For the contact form you would update the contact.php file and for the demo form you would update the mail.php file. Within both of these files there is a comment (//Add to list) where you will change the list ID.

##Updating Contact Email Address
If you would like to add more people to the list of senders for the contact form you will need to edit the contact.php file. Towards the bottom you will see currently a single email address and to add more people add the following line of code beneath the current email address.

`
$grid_email->addTo("new_email@address.com");
` 