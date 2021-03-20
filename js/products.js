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
idFurniture= ""; // ID de chaque table

// Création de la page produit
async function productsFurniture(){
        const queryString = window.location.search
        console.log(queryString)
        // Récupération de l'ID du produit situé dans l'URL 
        const urlParams = new URLSearchParams(queryString)
        idFurniture = urlParams.get("id")

        const furnitures = await getAllFurnitures()

        document.getElementById("details__photo") // On récupère l'ID "details__photo",
        .setAttribute("src", furnitures.imageUrl) // et on lui attribut le src de l'image dans l'API
        document.getElementById("details__section--name") // On récupère l'ID "details__section--name", 
        .innerHTML = furnitures.name // et on définit la syntaxe HTML situé dans l'API concernant le nom
        document.getElementById("details__section--description") // On récupère l'ID "details__section--description", 
        .innerHTML = furnitures.description // et on définit la syntaxe HTML situé dans l'API concernant la description
        document.getElementById("details__section--price") // On récupère l'ID "details__section--price", 
        .innerHTML = "Prix : " + furnitures.price / 50 + "€" // et on définit la syntaxe HTML situé dans l'API concernant le prix

        // Pour chaque "furnitures" ayant "varnish", on lui crée un élément option HTML, on le met "enfant" de l'ID, et on définit sa syntaxe situé dans l'API
        furnitures.varnish.forEach((product) => { 
            let optionProduct = document.createElement("option");
            document.getElementById("varnish").appendChild(optionProduct).innerHTML = product;
        });
};