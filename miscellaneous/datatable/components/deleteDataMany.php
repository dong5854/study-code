<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$_id = $_GET['_id'];
$_id_list = explode(",", $_id);

$DB = new SQLite3(__DIR__.'/../database/test.db');

foreach($_id_list as $val){
    $query= "DELETE FROM 'test' WHERE _id = $val;";
    $result = $DB->query($query);
}
?>