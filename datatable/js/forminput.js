$(document).ready(function() {
    let table = $('#example').DataTable({
        columnDefs: [{
            orderable: false,
            targets: [0,4]
        }]
    });
    document.getElementById("example").classList.remove("invisible");

    $('.delete').click( function() {
        $(this).closest("tr").remove();
    })

    $('.delete-multi').click(function (){
        $("input:checked").closest("tr").remove();
    })

    $('.select-one').click(function() {
        checked_cnt = $('input:checked').length;
        if(checked_cnt > 1){
            document.getElementsByClassName("delete-multi")[0].classList.remove("invisible");
        } else {
            document.getElementsByClassName("delete-multi")[0].classList.add("invisible");
        }
    })

    $('#select-all').click(function(){
        if($('#select-all').is(":checked")){
            $('.select-one').prop("checked",true);
            document.getElementsByClassName("delete-multi")[0].classList.remove("invisible");
        } else{
            $('.select-one').prop("checked",false);
            document.getElementsByClassName("delete-multi")[0].classList.add("invisible");
        }
    })
} );