<?php

$fname = $_POST['contact-f-name'];
$lname = $_POST['contact-l-name'];
$email = $_POST['contact-email'];
$text = $_POST['contact-message'];

$address = "__YOUR_EMAIL__"; 

$subject  = "__SUBJECT__";

$headers  = "From: " . strip_tags($email) . "\r\n";
$headers .= "Reply-To: ". strip_tags($email) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/plain; Charset=UTF-8 \r\n";

$message = "Automatic message\r\n" 
					."Name: ".strip_tags($fname)." ".strip_tags($lname)."\r\n"
					."Email: ".strip_tags($email)."\r\n"
					."Message: ".strip_tags($text)."\r\n";

if(@mail($address, $subject, $message, $headers)) { echo "true"; } 
else { echo "false"; }

?>