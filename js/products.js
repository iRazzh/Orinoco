/* ID du produit */
let idFurnitures ="";


/* Lien API */ 
getAllFurnitures = () => {
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
        request.open("GET", "http://localhost:3000/api/furniture" + idFurnitures);
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
    
    let furnitureSection = document.createElement("div");
    let furnitureLien = document.createElement("a");
    let furnitureImage = document.createElement("img");
    let furnitureElement = document.createElement("div");
    let furnitureNom = document.createElement("h2");
    let furniturePrix = document.createElement("p");

    furnitureSection.setAttribute("class", "furniture--container");
    furnitureLien.setAttribute("href", "produits.html?id=" + furniture._id);
    furnitureImage.setAttribute("src", furniture.imageUrl);
    furnitureImage.setAttribute("alt", "Photo du produit mis en vente");
    furnitureElement.setAttribute("class", "furniture--element");
    furnitureNom.setAttribute("class", "furniture--name");
    furniturePrix.setAttribute("class", "furniture--price");

    listFurnitures.appendChild(furnitureSection);
    furnitureSection.appendChild(furnitureLien);
    furnitureLien.appendChild(furnitureImage);
    furnitureLien.appendChild(furnitureElement);
    furnitureElement.appendChild(furnitureNom);
    furnitureElement.appendChild(furniturePrix);


    furnitureNom.textContent = furniture.name;
    furniturePrix.textContent = furniture.price / 50 + " €";
    });
}
