/* ID du produit */
let idProducts ="";


/* Lien API */ 
getAllProducts = () => {
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if
            (this.readyState == XMLHttpRequest.DONE && this.status == 200){
                resolve(JSON.parse(this.responseText));
                console.log("Admin : OK !");
            } else {
                console.log("Admin : ERROR connection API failed");
            }
        };
        request.open("GET", "http://localhost:3000/api/furniture" + idProducts);
        request.send();
    });
};

/* Création de l'HTML après API */

