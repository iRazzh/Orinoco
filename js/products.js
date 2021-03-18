/* Lien API */ 

let getAllFurnitures = function (){
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status === 200){
                resolve(JSON.parse(this.responseText));
                console.log("Admin : OK !");
            } else {
                console.log("Admin : ERROR connection API failed");
            }
        };
        request.open("GET", "http://localhost:3000/api/furniture" + '/' + idFurniture);
        request.send();
    });
};

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
let idFurniture = urlParams.get('id')

idFurniture= "";