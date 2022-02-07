<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
$_id = $_GET['_id'];

$DB = new SQLite3(__DIR__.'/../database/test.db');

$result = $DB->query("DELETE FROM 'test' WHERE _id = $_id;");
?>