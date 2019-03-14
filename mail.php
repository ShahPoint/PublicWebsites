<?php

if($_SERVER['REQUEST_METHOD'] != 'POST') exit();

//$receiptant_email = 'steve.wilson@cloudpcr.net, jay.shah@cloudpcr.net';
$receiptant_email = 'erik@brightthought.net';

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

if($err){
	echo "There was an error";
	exit();
}

$message = "Name: $full_name\r\n";
$message .= "Email: $email\r\n";
$message .= "Phone: $phone";

$headers  = "From: " . strip_tags($email) . "\r\n";
$headers .= "Reply-To: ". strip_tags($email) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/plain; Charset=UTF-8 \r\n";

if(mail($receiptant_email, 'Free Trial Submission', $message, $headers)){
	echo 'true';
	exit();
}

echo 'failed';
exit();

