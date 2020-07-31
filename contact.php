<?php

if($_SERVER['REQUEST_METHOD'] != 'POST') exit();

require_once 'vendor/autoload.php';

//Loads the curl object
$curl = new \CloudPCR\curl_control();

//Function to get the key of the desired value
function getKey( $value, $array ){
	return array_search($value, array_column($array, 'name'));
}

//Get form post data
$data = $_POST['data'];

//Set post data to variables
$full_name = $data[getKey('name', $data)]['value'];
$email = $data[getKey('email', $data)]['value'];
$phone = $data[getKey('phone', $data)]['value'];
$user_message = $data[getKey('message', $data)]['value'];

//Prepare name for use with User.com
$name = explode( ' ', $full_name);
$first_name = $last_name = '';

//Set the users name
if(count($name) == 1){

	$first_name = $last_name = $name[0];

}else{

	foreach($name as $key => $value){

		if($key == 0 ){

			$first_name = $value;

		}else {

			$last_name .= $value . ' ';

		}
	}
}

//Set array to pass to User.com
$user_data = [
	'email' => $email,
	'first_name' => $first_name,
	'last_name' => $last_name
];

//Find the user to update
$search = $curl->init('search', 'GET', $_POST['key']);
$search = json_decode($search[1], true);

//Update the the user
$response = $curl->init('update', 'PUT', $search['id'], $user_data);

if($response[0]){

	echo "false";
	exit();

}else{

	//Get response from user update
	$response = json_decode($response[1], true);
	$con_message = "User Message: " . $user_message;

	//Create the array to update the conversation with User.com
	$con_data = [
		'note' => strip_tags($con_message),
	];

	$con_response = $curl->init('note', 'POST', $response['id'], $con_data);


	if($con_response[0]){
		echo "false";
		exit();
	}

	//Add to list
	$list_data = ['list' => 3];
	$list = $curl->init('list', 'POST', $response['id'], $list_data);

	if($list[0]){
		echo "false";
		exit();
	}
}



//Setup the message for the email
$message = "Contact Information: \r\n\n"
           ."Name: ".strip_tags($full_name)."\r\n"
           ."Email: ".strip_tags($email)."\r\n"
           ."Phone: ".strip_tags($phone)."\r\n"
           ."Message: ".strip_tags($user_message)."\r\n";

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
//$grid_email->setFrom($email);
$grid_email->setFrom('system@cloudpcr.net');
$grid_email->setSubject("Contact-Us -  $full_name");
$grid_email->addContent("text/html", $message);


try {
	$sendgrid->send( $grid_email );
	echo 'true';
}catch(Exception $e){
	echo 'failed';
}

exit();

