<?php include __DIR__."/viewDatabase.php"; ?>
<button type="submit" class="delete-multi">delete-multi</button>
    <table id="example" class="display" style="width:100%">
        <thead>
            <tr>
                <th>select<input type="checkbox" id="select-all"></th>
                <th>userid</th>
                <th>username</th>
                <th>level</th>
                <th>control</th>
            </tr>
        </thead>
        <tbody>
            <?php
                while($row = $result->fetchArray(SQLITE3_ASSOC)){
                    echo '<tr id='.$row["_id"].'>
                    <td><input type="checkbox" id="row-'.$row["_id"].'-select" name="row-'.$row["_id"].'-select" class="select-one"></td>
                    <td><input type="text" id="row-'.$row["_id"].'-userid" name="row-'.$row["_id"].'-userid" value="'.$row["userid"].'"><i>'.$row["userid"].'</i></td>
                    <td><input type="text" id="row-'.$row["_id"].'-username" name="row-'.$row["_id"].'-username" value="'.$row["username"].'"><i>'.$row["username"].'</i></td>
                    <td><select size="1" id="row-'.$row["_id"].'-level" name="row-'.$row["_id"].'-level">';
                    if($row["level"] == 1){
                        echo '<option value="1" selected="selected">
                            1
                        </option>
                        <option value="2">
                            2
                        </option>
                        <option value="3">
                            3
                        </option>';
                    } elseif($row["level"] == 2){
                        echo '<option value="1">
                            1
                        </option>
                        <option value="2" selected="selected">
                            2
                        </option>
                        <option value="3">
                            3
                        </option>';
                    } elseif($row["level"] == 3){
                        echo '<option value="1">
                            1
                        </option>
                        <option value="2">
                            2
                        </option>
                        <option value="3" selected="selected">
                            3
                        </option>';
                    }
                    echo '</select></td>
                    <td><button type="submit" class="edit">edit</button><button type="button" class="delete">delete</button></td>
                </tr>';
            }
            ?>
        </tbody>
        <tfoot>
            <tr>
                <th>select</th>
                <th>userid</th>
                <th>username</th>
                <th>level</th>
                <th>control</th>
            </tr>
        </tfoot>
    </table>