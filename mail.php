<?php

if($_SERVER['REQUEST_METHOD'] != 'POST') exit();


$full_name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];

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

$user_data = [
	'email' => $email,
	'first_name' => $first_name,
	'last_name' => $last_name
];


$url = 'https://cloudpcrtest.user.com/api/public/users/';

$curl = curl_init($url);

curl_setopt_array($curl, array(
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "POST",
	CURLOPT_POSTFIELDS => json_encode($user_data),
	CURLOPT_HTTPHEADER => array(
		"authorization: Token TR5Of4PN9qzowKnyONRAfKQZFBF76ybekYyvwvFrZBxJa09VPGTEfcPHCuClSC11",
		"content-type: application/json"
	),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if($err){
	echo "false";
	exit();
}else{
	$response = json_decode($response, true);

	$list_url = "https://cloudpcrtest.user.com/api/public/users/{$response['id']}/add_to_list/";
	$list_curl = curl_init($list_url);

	$list_data = ['list' => 1];

	curl_setopt_array($list_curl, array(
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($list_data),
		CURLOPT_HTTPHEADER => array(
			"authorization: Token TR5Of4PN9qzowKnyONRAfKQZFBF76ybekYyvwvFrZBxJa09VPGTEfcPHCuClSC11",
			"content-type: application/json"
		),
	));

	$list_response = curl_exec($list_curl);
	$err = curl_error($list_curl);
	curl_close($list_curl);

	if($err){
		echo "false";
		exit();
	}
}

echo 'true';
exit();

