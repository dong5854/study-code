const date = "2022-02-04";
const url = `./json/${date}.json`;
$.ajax({
    url: url,
    type: "GET",
    async: false,                   
    success: function (response) {
    }}).done (function (response) {
            const table = document.getElementById("my_datatable");

            //----tbody
            const tbody = document.createElement("tbody");
            response.forEach(element => {
            for(key in element){
                if(key == "timestamp"){
                    continue;
                }
                const tr = document.createElement("tr");
                const tdType = document.createElement("td");
                const tdData = document.createElement("td");
                tdType.innerText = key;
                tdData.innerText = JSON.stringify(element[key]);
                tr.appendChild(tdType);
                tr.appendChild(tdData);
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
        })
        //----tbody
    })