<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <title>main</title>
</head>
<body>
    <table id="my_datatable" class="display">
        <thead>
            <tr>
                <th>type</th>
                <th>status</th>
            </tr>
        </thead>
    </table>
</body>
<script>
$(document).ready( function () {
    $('#my_datatable').DataTable();
} );
</script>
<script>
    <?php require_once("./js/datatables.js") ?>
</script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.js"></script>
</html>