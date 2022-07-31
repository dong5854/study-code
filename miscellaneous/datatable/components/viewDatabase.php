<?php

$DB = new SQLite3(__DIR__.'/../database/test.db');

// if($DB->lastErrorCode() == 0){
// 	echo "Database connection succeed!";
// }
// else {
// 	echo "Database connection failed";
//     echo $DB->lastErrorMsg();
// }

$result = $DB->query("SELECT * FROM 'test';");

// while($row = $result->fetchArray(SQLITE3_ASSOC)){         
//         echo $row["userid"];
//         echo $row["username"];
//         echo $row["level"]; 
// }
?>