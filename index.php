<?php

$ip = $_SERVER['REMOTE_ADDR'];
$referer = $_SERVER['HTTP_REFERER'];

$uri = $_SERVER['REQUEST_URI'];
$request = parse_url($uri, PHP_URL_PATH);
$params = parse_url($uri, PHP_URL_QUERY);

switch($request){
    default:
        require __DIR__.'/main.html';
    break;
}
?>