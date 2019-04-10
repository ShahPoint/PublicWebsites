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
$full_name = $data[getKey('name', $data)]['value'];
$email = $data[getKey('email', $data)]['value'];
$phone = $data[getKey('phone', $data)]['value'];

//Prepare the data to be sent to User.com
$name = explode( ' ', $full_name);
$first_name = $last_name = '';

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

//Create array to be sent to User.com
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

//Check to make sure there wasn't an error
if($response[0]){
	echo "false";
	exit();
}else{
	$response = json_decode($response[1], true);

	//Add to list
	$list_data = ['list' => 3];
	$list = $curl->init('list', 'POST', $response['id'], $list_data);

	if($list[0]){
		echo "false";
		exit();
	}
}

echo 'true';
exit();

