<?php
/**
 * Created by PhpStorm.
 * User: erik
 * Date: 2019-03-15
 * Time: 12:35
 */

namespace CloudPCR;


class curl_control {

	function __construct(){}

	function init($type, $method, $key = null, Array $data = []){

		$url = $this->curl_url($type, $key);

		$response = $this->curl($method, $data, $url);

		return $response;

	}

	private function curl_url($type, $id){
		switch($type){
			case 'conversation':
				$url = "https://cloudpcrtest.user.com/api/public/users/$id/conversations/";
				break;
			case 'update':
				$url = "https://cloudpcrtest.user.com/api/public/users/$id/";
				break;
			case 'search':
				$url = "https://cloudpcrtest.user.com/api/public/users/search/?key=$id";
				break;
			case 'list':
				$url ="https://cloudpcrtest.user.com/api/public/users/$id/add_to_list/";
				break;
		}

		return $url;
	}

	private function curl( $method, $data, $url ){

		$curl = curl_init($url);

		$headers = array(
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => $method,
			CURLOPT_HTTPHEADER => array(
				"authorization: Token TR5Of4PN9qzowKnyONRAfKQZFBF76ybekYyvwvFrZBxJa09VPGTEfcPHCuClSC11",
				"content-type: application/json"
			)
		);

		if(!empty($data)){
			$headers[CURLOPT_POSTFIELDS] = json_encode($data);
		}

		curl_setopt_array($curl, $headers);

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		return [$err, $response];

	}
}