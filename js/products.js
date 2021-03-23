/* Lien API */ 

let getAllFurnitures = function (){
    // Si l'ID ne vaut rien, ça return en null
    if(idFurniture === "")
    {
        return null
    }
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

idFurniture= ""; // ID de chaque table

// Création de la page produit
async function productsFurniture(){
        const queryString = window.location.search
        console.log(queryString)
        // Récupération de l'ID du produit situé dans l'URL 
        const urlParams = new URLSearchParams(queryString)
        idFurniture = urlParams.get("id")
        
        const furnitures = await getAllFurnitures()
        // Si furnitures est égal à null, on envoie une alerte avec une redirection
        if(furnitures == null) 
        {
            alert("Un souci avec l'URL est survenue, vous allez être redirigé vers la page d'accueil.")
            document.location.href = "index.html" // Redirection vers l'index
        }

        document.getElementById("details__photo") // On récupère l'ID "details__photo",
        .setAttribute("src", furnitures.imageUrl) // et on lui attribut le src de l'image dans l'API
        document.getElementById("details__section--name") // On récupère l'ID "details__section--name", 
        .innerHTML = furnitures.name // et on définit la syntaxe HTML situé dans l'API concernant le nom
        document.getElementById("details__section--description") // On récupère l'ID "details__section--description", 
        .innerHTML = furnitures.description // et on définit la syntaxe HTML situé dans l'API concernant la description
        document.getElementById("details__section--price") // On récupère l'ID "details__section--price", 
        .innerHTML = "Prix : " + furnitures.price / 100 + "<b> €</b>" // et on définit la syntaxe HTML situé dans l'API concernant le prix

        // Pour chaque "furnitures" ayant "varnish", on lui crée un élément option HTML, on le met "enfant" de l'ID, et on définit sa syntaxe situé dans l'API
        furnitures.varnish.forEach((product) => { 
            let optionProduct = document.createElement("option");
            document.getElementById("varnish").appendChild(optionProduct).innerHTML = product;
        });
};

/* Création page panier */

// Création localStorage

if (localStorage.getItem("cart")) {

} else {
    let furnituresCart = []
    localStorage.setItem("cart", JSON.stringify(furnituresCart));
}

// Panier de l'utilisateur 
let furnituresCart = JSON.parse(localStorage.getItem("cart"))


// Ajout de l'article au panier de l'utilisateur 
if (document.getElementById('command') != null) {
    const command = document.getElementById('command')

    command.addEventListener('click', async function(){
        console.log('Le bouton marche putain!')
        const furnitures = await getAllFurnitures()

        furnituresCart.push(furnitures)
        localStorage.setItem("cart", JSON.stringify(furnituresCart))
        console.log('Ajout au panier réussi')
        console.log(furnituresCart + " sont dans le panier")
    })
}