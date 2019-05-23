<?php

namespace CloudPCR;

if($_SERVER['REQUEST_METHOD'] != 'POST') exit('Permission Denied');

class feature_display {

	private $regex = "/[^a-zA-Z0-9\-]/";

	public function __construct() {

		$search = strtolower($_POST['heading']);
		$search = preg_replace($this->regex, '-', $search);

		$this->get_content( $search );
	}

	private function get_content( $file ){
		$file_path = 'features_content/' . $file . '.html';
		if(file_exists($file_path)){
			$html = file_get_contents($file_path);
			echo $html;
		}else{
			echo 'failed';
		}

		exit();
	}
}

new feature_display();