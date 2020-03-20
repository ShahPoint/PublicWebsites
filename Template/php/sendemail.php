<?php 
$mailto = 'steve.wilson@365consulting.io';
$subject = 'Website Contact Form';
function cleaner($value){
	$badstuff = array('to:', 'cc:', 'bss:', 'content-type:', 'mime-version:', 'multipart-mixed:', 'content-transfer-encoding:');
	
	foreach($badstuff as $v){
		if(stripos($value, $v) !== false){
			return '';
		}
	}
	$value = str_replace(array("\r", "\n", "%0a", "%0d"), ' ', $value);
	
	return trim($value);
}
$cleaned = array_map('cleaner', $_POST);

	if(!empty($cleaned['name']) && !empty($cleaned['email']) && !empty($cleaned['message']) ){
		
		$email_message = "Name: " . $cleaned['name'] . "\n\n" . $cleaned['message'];
		$name = $cleaned['name'];
		if(mail($mailto, $subject, $email_message, "From: \"$name\" <".$cleaned['email'].">\nReply-To: \"".ucwords($cleaned['name'])."\" <".$cleaned['email'].">")){
				
		echo ' We have received your message, and we will repond to your message within 24 hours.';
		
		}else{
			
		echo 'Something went wrong and your message was not sent please try again later. Name: ' . $cleaned['name'] . ' Email: ' . $cleaned['email'] . ' To: ' . $mailto;
		
		}
	}else{
		
		echo 'There were invalid characters found in your message please remove them and try again.';
		
	}

	

?>