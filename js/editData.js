let edit = document.getElementsByClassName("edit");

for(let i=0; i < del.length; i++){
    edit[i].addEventListener("click", editData);
}

function editData(e){
    const tr = e.target.closest("tr");
    const id = tr.id;
    const userid = document.getElementById(`row-${id}-userid`).value;
    const username = document.getElementById(`row-${id}-username`).value;
    const level = document.getElementById(`row-${id}-level`).value;

    axios.get('../dong_test/components/editData.php', {
            params: {
                _id: `${id}`,
                userid: `${userid}`,
                username: `${username}`,
                level: `${level}`,
            }
        }
    ).then((response) => {
        console.log(response);
        window.location.reload();
        // $('#example').load(" #example");
    });
}