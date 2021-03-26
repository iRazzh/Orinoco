// Lien API Produits

let getOneFurniture = function (idFurniture){   
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status === 200){
                console.log("Admin : OK !");
                resolve(JSON.parse(this.responseText));
            }
            else if(this.status === 500 || this.status === 404)
            {
                console.log("Admin : ERROR product not found");
                resolve(null)
            }
            else {
                console.log("Admin : ERROR connection API failed");
            }
        };
        request.open("GET", "http://localhost:3000/api/furniture" + '/' + idFurniture);
        request.send();
    });
};

// Lien API tous les produits API 

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
        request.open("GET", "http://localhost:3000/api/furniture");
        request.send();
    });
};