<?php
require_once 'vendor/autoload.php';

if($_SERVER['REQUEST_METHOD'] != 'POST') exit();

$full_name = $_POST['name'];
$user_email = $_POST['email'];
$phone = $_POST['phone'];
$state = $_POST['state'];


$email = $_POST['email'];
$phone = $_POST['phone'];

$name = explode( ' ', $full_name);
$first_name = $last_name = '';




$message = "Submission Content<br>"
           ."<p>Name: ".strip_tags($full_name)."</p>"
           ."<p>Email: ".strip_tags($email)."</p>"
           ."<p>Phone: ".strip_tags($phone)."</p>"
           ."<p>City and State: ".strip_tags($state)."</p>";

$sendgrid = new \SendGrid("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");
$email    = new \SendGrid\Mail\Mail();

$email->addTo("erik@brightthought.co");
$email->setFrom($user_email);
$email->setSubject("Careers - $full_name");
$email->addContent("text/html", $message);

try {
	$sendgrid->send( $email );
	echo 'true';
}catch(Exception $e){
	echo 'failed';
}

exit();
