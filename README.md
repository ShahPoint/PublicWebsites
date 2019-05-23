#CloudPCR update instructions

##Curl Object
The communication between User.com and the website is handled within the curl_control.php file in the control folder. If changing account the token would need to be updated which would be found under the CURLOPT_HTTPHEADER.

`CURLOPT_HTTPHEADER => array(
 				"authorization: Token m1h1JjTwtln4GmmAQg2BbQBZHrMWkOvzg9edvgNvK4xYhGBnySGPh07VjWY2K5NW",
 				"content-type: application/json"
 			)` 
 			
##Updating Lists
If you would like to change the list where the user is added to there are two files that handle this for the various forms. For the contact form you would update the contact.php file and for the demo form you would update the mail.php file. Within both of these files there is a comment (//Add to list) where you will change the list ID.

##Updating Contact Email Address
If you would like to add more people to the list of senders for the contact form you will need to edit the contact.php file. To add more email address add append them to this array in the contact.php file at line 109.

`
$send_to = [
	"jay.shah@cloudpcr.net" => "Jay Shah",
	"steve.wilson@cloudpcr.net" => "Steve Wilson",
	"sam.kilzer@cloudpcr.net" => "Sam Kilzer"
];
` 

##Features Modal Content
Each feature has a corresponding file in the features_content folder. Find that file and edit the HTML within it. If you are changing the title of the feature in the H3 tag within the index.html file, make sure that the content file name matches the change. All the file name shouldn't contain and spaces or characters other than a dash (-). All non alphanumeric characters, and spaces will be converted into a dash when searching for files.