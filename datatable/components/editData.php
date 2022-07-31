<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$_id = $_GET['_id'];
$userid = $_GET['userid'];
$username = $_GET['username'];
$level = $_GET['level'];

$DB = new SQLite3(__DIR__.'/../database/test.db');
$query ="UPDATE 'test' SET userid = '$userid', username = '$username', level= '$level' WHERE _id = $_id;";

$result = $DB->query($query);
?>