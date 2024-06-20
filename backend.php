<?php
// backend.php -  Thu Jun 20 13:06:34 CDT 2024
// 

require_once "essentials.php";

$id = 'something wrong';
$data = [];
$response = 'Nothing happened';


if(empty($_POST)){
    echo json_encode("No POST data");
    die;
} else {
    
    $action = $_POST['action'];
    if( array_key_exists('data', $_POST) ){
        $data = (array)json_decode($_POST['data']);
    }
    
}


switch ($action) {
    case 'get_random_text':
        $response = get_random_text();
        break;
    case 'update_text':
    	$response = $data;
    	break;
    case 'add_text':
    	$response = $data;
    	break;
	default:
		break;
}

echo json_encode($response);
die;

/********************************************/

/////////////////////////////
// Select a random bit of text
function get_random_text() {
	
	$db_obj = new DbClass();
	// How many quotes are there?
	$sql = "SELECT COUNT(id) FROM repository";
	$db_result = $db_obj->getTableNoParams($sql);
	
	$ceiling = $db_result[0]['COUNT(id)'];
	$rand_id = rand(1, $ceiling);
	
	$sql  = "SELECT id, some_text, descriptor FROM repository " ;
	$sql .= "WHERE id=?";
	$db_result = $db_obj->simpleOneParamRequest($sql, 'i', $rand_id);
	$db_obj->closeDB();
	
	return  $db_result[0];
}


/////////////////////////////
// Update an existing entry
function update_entry($indata) {
	$id = $indata['id'];
	$descriptor = $indata['descriptor'];
	$some_text = $indata['some_text'];
	
	$db_obj = new DbClass();
	$sql = "UPDATE repository SET descriptor=?, some_text=? WHERE id=?";
	$result = $db_obj->safeInsertUpdateDelete($sql, 'ssi', [$descriptor, $some_text, $id]);
	$db_obj->closeDB();
	
	return $result;
}

/////////////////////////////
//
function add_text($indata){
	$descriptor = $indata['descriptor'];
	$some_text = $indata['some_text'];
	
	$db_obj = new DbClass();
	$sql = "INSERT INTO repository (descriptor, some_text) VALUES (?,?)";
	$result = $db_obj->safeInsertUpdateDelete($sql, 'ss', [$descriptor, $some_text]);
	$db_obj->closeDB();
	
	return $result;
}



