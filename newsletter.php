<?php

$email = $_POST['newsletter-email'];

$address = "__YOUR_EMAIL__";

$subject  = "__SUBJECT__";

$headers  = "From: " . strip_tags($email) . "\r\n";
$headers .= "Reply-To: ". strip_tags($email) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/plain; Charset=UTF-8 \r\n";

$message = "Automatic message\r\n" 
					."Email: ".strip_tags($email)."\n";

if(@mail($address, $subject, $message, $headers)) { echo "true"; } 
else { echo "false"; }

?>