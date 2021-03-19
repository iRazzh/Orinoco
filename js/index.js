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
        request.open("GET", "http://localhost:3000/api/furniture");
        request.send();
    });
};

/* Création de l'HTML après API */
async function allFurnitures() {
    const furnitures = await getAllFurnitures();

    /* Mettre en lien avec la page HTML */ 
    let listFurnitures = document.getElementById("listFurnitures");

    /* Création des éléments HTML */
    // Pour chaque élément de l'API, on lui crée un élément HTML 
    furnitures.forEach((furniture) => {
    
    let furnitureSection = document.createElement("div");   // div pour tout englober
    let furnitureLien = document.createElement("a");        // Lien du produit en fonction de l'ID 
    let furnitureImage = document.createElement("img");     // Image du produit
    let furnitureElement = document.createElement("div");   // Div pour les élements de la carte 
    let furnitureNom = document.createElement("h2");        // h2 de la div element 
    let furniturePrix = document.createElement("p");        // p de la div element 

    furnitureSection.setAttribute("class", "furniture--container");             // Ajout du container 
    furnitureLien.setAttribute("href", "produits.html?id=" + furniture._id);    // Ajout de l'HREF vers la page produit 
    furnitureImage.setAttribute("src", furniture.imageUrl);                     // Ajout du lien de l'image
    furnitureImage.setAttribute("alt", "Photo du produit mis en vente");        // Ajout de l'attribut alt 
    furnitureElement.setAttribute("class", "furniture--element");               // Ajout de la class pour gérer les éléments
    furnitureNom.setAttribute("class", "furniture--name");                      // Ajout de la class name 
    furniturePrix.setAttribute("class", "furniture--price");                    // Ajout de la class price

    listFurnitures.appendChild(furnitureSection);   // l'ID englobe la section
    furnitureSection.appendChild(furnitureLien);    // la section prend en compte le lien 
    furnitureLien.appendChild(furnitureImage);      // le lien prend en compte l'image
    furnitureLien.appendChild(furnitureElement);    // le lien prend en compte l'élément 
    furnitureElement.appendChild(furnitureNom);     // l'éléement prend en compte le nom
    furnitureElement.appendChild(furniturePrix);    // l'élément prend en compte le prix

    furnitureNom.textContent = furniture.name;                  // Envoie le nom du produit
    furniturePrix.textContent = furniture.price / 50 + " €";    // Envoie le prix du produit
    });
}

