let del_many = document.getElementsByClassName("delete-multi");
let del = document.getElementsByClassName("delete");

del_many[0].addEventListener("click", deleteDataMulti);

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

function deleteDataMulti(e){
    const checkedBoxes = document.querySelectorAll('.select-one:checked');
    const deleteExpected = [];
    for(let i=0; i < checkedBoxes.length; i++){
        const id = checkedBoxes[i].closest("tr").id;
        deleteExpected.push(id)
    }
    deleteExpectedString = deleteExpected.toString()

    axios.get('../dong_test/components/deleteDataMany.php', {
        params: {
            _id: `${deleteExpectedString}`
        }
    }
    ).then((response) => {
        console.log(response);
    });
}