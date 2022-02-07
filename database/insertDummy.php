<?php

$DB = new SQLite3(__DIR__.'/test.db');

if($DB->lastErrorCode() == 0){
	echo "Database connection succeed!";
}
else {
	echo "Database connection failed";
    echo $DB->lastErrorMsg();
}

$DB->query("create table test (_id, userid, username, level);");

for($i=0; $i < 100; $i++){
    $query = "INSERT INTO 'test' ('_id','userid', 'username', 'level') VALUES (${i}, 'userid${i}', 'username${i}','1');";
    echo $query;
    $DB->exec($query);
}

$result = $DB->query("SELECT * FROM 'test';");

while($row = $result->fetchArray(SQLITE3_ASSOC)){         
        echo $row["userid"];
        echo $row["username"];
        echo $row["level"]; 
}
?>