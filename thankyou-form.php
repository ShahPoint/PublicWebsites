<?php

if($_SERVER['REQUEST_METHOD'] != 'POST') exit();

require_once 'vendor/autoload.php';

$curl = new \CloudPCR\curl_control();

//Function to get the key of the desired value
function getKey( $value, $array ){
	return array_search($value, array_column($array, 'name'));
}

//Get form post data
$data = $_POST['data'];

//Set post data to variables
$message = "Additional Form Date: \r\n\n";

foreach($data as $value){
	if($value['name'] != 'form') {
		$message .= $value['name'] . ": " . strip_tags( $value['value'] ) . "\r\n";
	}
}

$full_name =  $data[getKey('name', $data)]['value'];
$email = $data[getKey('email', $data)]['value'];
$form = $data[getKey('form', $data)]['value'];



//Establish Send Grid connecton
$sendgrid = new \SendGrid("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");
$grid_email    = new \SendGrid\Mail\Mail();

//Set sending variables
$send_to = [
	"jay.shah@cloudpcr.net" => "Jay Shah",
	"steve.wilson@cloudpcr.net" => "Steve Wilson",
	"sam.kilzer@cloudpcr.net" => "Sam Kilzer"
];
$grid_email->addTos($send_to);
$grid_email->setFrom($email);
$grid_email->setSubject("$form -  $full_name");
$grid_email->addContent("text/html", $message);


try {
	$sendgrid->send( $grid_email );
	echo 'true';
}catch(Exception $e){
	echo 'failed';
}

exit();


