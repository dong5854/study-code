$(document).ready(function() {
    let table = $('#example').DataTable({
        columnDefs: [{
            orderable: false,
            targets: [0,4]
        }]
    });

    $('#edit').click( function() {
        let data = table.$('input, select').serialize();
        alert(
            "The following data would have been submitted to the server: \n\n"+
            data.substr( 0, 120 )+'...'
        );
        return false;
    } );

    $('.delete').click( function() {
        $(this).closest("tr").remove();
    })

    $('.delete-multi').click(function (){
        $("input:checked").closest("tr").remove();
    })

    $('#select-all').click(function(){
        if($('#select-all').is(":checked")){
            $('.select-one').prop("checked",true);
        } else{
            $('.select-one').prop("checked",false);
        }
    })
} );