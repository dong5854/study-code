<?php
error_reporting(E_ALL);
ini_set("error_display", 1);
#----------------------레디스 연결 시작----------------------
$redis = new Redis();
$redis->connect('127.0.0.1', 9000);
$redis->auth('foobar');
#----------------------레디스 연결 끝----------------------

#----------------------화이트 리스트 추출 시작----------------------
$whitelist = getWhiteList("dev@wirebarley.com", $redis);

var_dump($whitelist);
#----------------------화이트 리스트 추출 끝----------------------

#----------------------함수들----------------------
function getWhiteList($userid, $redis){
  $ips = $redis->lRange($userid, 0, -1);
  
  return $ips;
}
#----------------------함수들----------------------

?>