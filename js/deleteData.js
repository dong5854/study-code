let del = document.getElementsByClassName("delete");

for(let i=0; i < del.length; i++){
    del[i].addEventListener("click", deleteData);
}

function deleteData(e){
    const tr = e.target.closest("tr");
    const id = tr.id;
    axios.get('../dong_test/components/deleteData.php', {
            params: {
                _id: `${id}`
            }
        }
    ).then((response) => {
        console.log(response);
    });
}