<?php
error_reporting(E_ALL);
ini_set("error_display", 1);

$obj = file_get_contents('php://input');
$json = json_decode($obj);
foreach($json as $key=>$value){
    if(gettype($key) !== 'string'){
      ${$key} = $value;
    }else{
      ${$key} = ($value);
    }
}
foreach($_POST as $key=>$value){
    ${$key} = trim($value);
}

// redis connect
$redis = new Redis();
$redis->connect('127.0.0.1', 9000);
$redis->auth('foobar');

$result = $redis->hmGet('trial', array($userid));
$credit = $result[$userid];
$creditInt = intval($credit);

var_dump($creditInt);
$creditInt = $creditInt - 1;
var_dump($creditInt);

$redis->hMSet('trial', ["$userid" => "$creditInt"]);
?>