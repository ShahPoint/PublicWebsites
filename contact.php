<?php
require_once 'vendor/autoload.php';



$full_name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$state = $_POST['state'];


$email = $_POST['email'];
$phone = $_POST['phone'];

$from = array($email, $full_name);
/* $to = array(
	'jay.shah@cloudpcr.net' => 'Jay Shay',
	'steve.wilson@cloudpcr.net' => 'Steve Wilson'
	);
*/
$to = array('erik@brightthought.co', 'Erik Thomas');

$subject = 'Career Form Submission';

$username = 'jay.shah@shahpoint.com';
$password = '1qaz!QAZ';

$message = "Submission Content\r\n"
           ."Name: ".strip_tags($full_name)."\r\n"
           ."Email: ".strip_tags($email)."\r\n"
           ."Phone: ".strip_tags($phone)."\r\n"
           ."City and State: ".strip_tags($state)."\r\n";

$transport = Swift_SmtpTransport::newInstance('smtp.sendgrid.net', 587);
$transport->setUsername($username);
$transport->setPassword($password);
$swift = Swift_Mailer::newInstance($transport);

$message = new Swift_Message($subject);

$message->setFrom($from);
$message->setBody($message, 'text/html');
$message->setTo($to);

if($recipients = $swift->send($message, $failures)){
	echo 'true';
}else{
	echo 'failed';
}

exit();