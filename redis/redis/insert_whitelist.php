<?php
error_reporting(E_ALL);
ini_set("error_display", 1);
#----------------------레디스 연결 시작----------------------
$redis = new Redis();
$redis->connect('127.0.0.1', 9000);
$redis->auth('foobar');
#----------------------레디스 연결 끝----------------------

#----------------------이메일 추출 시작----------------------
$email_lists = [];

$userlists = apiCall('https://auth.useb.co.kr/users?page_size=1000');
$user_list_json = json_decode($userlists);
$user_list_data = $user_list_json->data;

foreach($user_list_data as $key=>$value){
  GLOBAL $email_list;
  $email = $value->email;
  array_push($email_lists, $email);
}
#----------------------이메일 추출 끝----------------------

#----------------------이메일별 화이트리스트 추출 시작----------------------
foreach($email_lists as $userid){

  $temp = getWhitelist($userid);
  $ips = [];
  $temp_json = json_decode($temp);
  $data = $temp_json->data;
  if(isset($data)){
    foreach($data as $d){
      // echo $userid;
      $ip_address = $d->ip_addr;
      array_push($ips, $ip_address);
    }
    foreach($ips as $ip){
      $current_ip_list = $redis->lRange($userid, 0, -1);
      if(in_array($ip,$current_ip_list)){
        echo "중복";
      } else{
        $redis->lpush($userid, $ip);
        echo $ip;
      }
    }
  }else{
    continue;
  }
}




#----------------------이메일별 화이트리스트 추출 끝----------------------


#----------------------함수들----------------------
function apiCall($uri){

  $curl = curl_init();

  curl_setopt_array($curl, array(
    CURLOPT_URL => $uri,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
  ));
  
  $response = curl_exec($curl);
  
  curl_close($curl);

  return $response;
}

function getWhitelist($id){

  $curl = curl_init();

  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://auth.useb.co.kr/users/{$id}/whitelist",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
  ));
  
  $response = curl_exec($curl);
  
  curl_close($curl);
  
  return $response;
}
#----------------------함수들----------------------

?>