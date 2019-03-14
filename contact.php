<?php

if($_SERVER['REQUEST_METHOD'] != 'POST') exit();

require_once 'vendor/autoload.php';

$full_name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$user_message = $_POST['message'];

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

$message = "Contact Information: \r\n\n"
           ."Name: ".strip_tags($full_name)."\r\n"
           ."Email: ".strip_tags($email)."\r\n"
           ."Phone: ".strip_tags($phone)."\r\n"
           ."Message: ".strip_tags($user_message)."\r\n";

if($err){
	echo "false";
	exit();
}else{
	$response = json_decode($response, true);

	$con_data = [
		'content' => strip_tags($user_message),
		'source' => 3,
		'source_context' => [
			'name' => 'Website contact form submission'
		]
	];

	$con_url = "https://cloudpcrtest.user.com/api/public/users/{$response['id']}/conversations/";
	$con_curl = curl_init($con_url);

	curl_setopt_array($con_curl, array(
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($con_data),
		CURLOPT_HTTPHEADER => array(
			"authorization: Token TR5Of4PN9qzowKnyONRAfKQZFBF76ybekYyvwvFrZBxJa09VPGTEfcPHCuClSC11",
			"content-type: application/json"
		),
	));

	$con_response = curl_exec($con_curl);
	$err = curl_error($con_curl);
	curl_close($con_curl);

	if($err){
		echo "false";
		exit();
	}
}

$message = "Form Content<br>"
          ."<p>Name: ".strip_tags($full_name)."</p>"
          ."<p>Email: ".strip_tags($email)."</p>"
          ."<p>Phone: ".strip_tags($phone)."</p>"
          ."<p>Message: ".strip_tags($user_message)."</p>";

$sendgrid = new \SendGrid("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");
$grid_email    = new \SendGrid\Mail\Mail();

$grid_email->addTo("jay.shah@cloudpcr.net");
$grid_email->setFrom($email);
$grid_email->setSubject("Career Form Submission");
$grid_email->addContent("text/html", $message);

try {
	$sendgrid->send( $grid_email );
	echo 'true';
}catch(Exception $e){
	echo 'failed';
}

exit();

