<?php
require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$full_name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$state = $_POST['state'];


$email = $_POST['email'];
$phone = $_POST['phone'];

$name = explode( ' ', $full_name);
$first_name = $last_name = '';



$mail = new PHPMailer(true);
$message = "Submission Content\r\n"
           ."Name: ".strip_tags($full_name)."\r\n"
           ."Email: ".strip_tags($email)."\r\n"
           ."Phone: ".strip_tags($phone)."\r\n"
           ."City and State: ".strip_tags($state)."\r\n";

try{
	$mail->isSMTP();
	$mail->HOST = 'smtp.sendgrid.net';
	$mail->SMTPAuth = true;
	$mail->Username = 'jay.shah@shahpoint.com';
	$mail->Password = '1qaz!QAZ';
	$mail->Port = 587;

	//$mail->addAddress('steve.wilson@cloudpcr.net', 'Steve Wilson');
	//$mail->addAddress('jay.shah@cloudpcr.net', 'Jay Shah');
	$mail->setFrom($email, $full_name);
	$mail->addAddress('erik@brightthought.net', 'Erik');
	$mail->Subject = 'New Career Request';
	$mail->Body = $message;
	$mail->send();

	echo 'true';
}catch(Exception $e){
	echo 'failed';
}

exit();