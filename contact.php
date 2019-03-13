<?php

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$state = $_POST['state'];

$receiptant_email = 'steve.wilson@cloudpcr.net, jay.shah@cloudpcr.net';
//$receiptant_email = 'erik@brightthought.net';

$subject  = "Careers Form Submission";

$headers  = "From: " . strip_tags($email) . "\r\n";
$headers .= "Reply-To: ". strip_tags($email) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/plain; Charset=UTF-8 \r\n";

$message = "Automatic message\r\n" 
					."Name: ".strip_tags($name)."\r\n"
					."Email: ".strip_tags($email)."\r\n"
					."Phone: ".strip_tags($phone)."\r\n"
                    ."City and State: ".strip_tags($state)."\r\n";

if(@mail($address, $subject, $message, $headers)) {
	echo "true";
}
else {
	echo "false";
}

exit();