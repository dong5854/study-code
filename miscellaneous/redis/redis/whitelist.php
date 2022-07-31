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

foreach($ips as $ip){
    $current_ip_list = $redis->lRange($userid, 0, -1);
    if(in_array($ip,$current_ip_list)){
      // echo "중복";
    } else{
      $redis->lpush($userid, $ip);
      // echo $ip;
    }
}
foreach($del_ips as $del_ip){
    $redis->lrem($userid, $del_ip, -5);
}
?>