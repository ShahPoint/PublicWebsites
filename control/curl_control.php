<?php

namespace CloudPCR;


class curl_control {

	/**
	 * Initiates the Curl request
	 *
	 * @param $type
	 * @param $method
	 * @param null $key
	 * @param array $data
	 *
	 * @return array
	 */
	function init($type, $method, $key = null, Array $data = []){

		$url = $this->curl_url($type, $key);

		$response = $this->curl($method, $data, $url);

		return $response;

	}

	/**
	 * Find the correct curl url to hit
	 *
	 * @param $type
	 * @param $id
	 *
	 * @return string
	 */
	private function curl_url($type, $id){
		switch($type){
			case 'note':
				$url = "https://app.userengage.com/api/public/users/$id/notes/";
				break;
			case 'update':
				$url = "https://app.userengage.com/api/public/users/$id/";
				break;
			case 'search':
				$url = "https://app.userengage.com/api/public/users/search/?key=$id";
				break;
			case 'list':
				$url ="https://app.userengage.com/api/public/users/$id/add_to_list/";
				break;
		}

		return $url;
	}

	/**
	 * Preform the curl request
	 *
	 * @param $method
	 * @param $data
	 * @param $url
	 *
	 * @return array
	 */
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
				"authorization: Token m1h1JjTwtln4GmmAQg2BbQBZHrMWkOvzg9edvgNvK4xYhGBnySGPh07VjWY2K5NW",
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
