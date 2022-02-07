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
                $id = 0;
                while($row = $result->fetchArray(SQLITE3_ASSOC)){
                    GLOBAL $id;
                    echo '<tr id="idx['.$row["userid"].']">
                    <td><input type="checkbox" id="row-'.$id.'-select" name="row-'.$id.'-select" class="select-one"></td>
                    <td><input type="text" id="row-'.$id.'-userid" name="row-'.$id.'-userid" value="'.$row["userid"].'"><i>'.$row["userid"].'</i></td>
                    <td><input type="text" id="row-'.$id.'-username" name="row-'.$id.'-username" value="'.$row["username"].'"><i>'.$row["username"].'</i></td>
                    <td><select size="1" id="row-'.$id.'-level" name="row-'.$id.'-level">
                        <option value="1" selected="selected">
                            1
                        </option>
                        <option value="2">
                            2
                        </option>
                        <option value="3">
                            3
                        </option>
                    </select></td>
                    <td><button type="submit" class="edit">edit</button><button type="submit" class="delete">delete</button></td>
                </tr>';
                    $id += 1;
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