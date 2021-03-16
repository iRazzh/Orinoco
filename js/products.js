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
    
    // Création de l'élément de la carte de chaque produit sur l'HTML 
    let furnitureSection = document.createElement("div"); // div pour tout englober
    let furniturePhoto = document.createElement("div"); // Div pour la photo de la carte 
    let furnitureElement = document.createElement("div"); // Div pour les élements de la carte 
    let furnitureImage = document.createElement("img"); // Image de la div photo
    let furnitureNom = document.createElement("h2"); //h2 de la div element 
    let furniturePrix = document.createElement("p"); //p de la div element 
    let furnitureLien = document.createElement("a"); //Lien du produit en fonction de l'ID 

    // Ajout des attributs aux éléments HTML créent juste avant 
    furnitureSection.setAttribute("class", "furniture--container"); // Ajout du container 
    furniturePhoto.setAttribute("class", "furniture--photo"); // Ajout de la class pour gérer l'image
    furnitureImage.setAttribute("src", furniture.imageUrl); // Ajout du lien de l'image
    furnitureImage.setAttribute("alt", "Photo du produit mis en vente"); // Ajout de l'attribut alt 
    furnitureElement.setAttribute("class", "furniture--element"); // Ajout de la class pour gérer les éléments
    furnitureNom.setAttribute("class", "furniture--name"); // Ajout de la class name 
    furniturePrix.setAttribute("class", "furniture--price"); // Ajout de la class price
    furnitureLien.setAttribute("href", "produits.html?id=" + furniture._id); // Ajout de l'HREF vers la page produit 

    // Placement des éléments sur l'HTML 
    listFurnitures.appendChild(furnitureSection); // l'ID englobe toute la section fourniture
    furnitureSection.appendChild(furniturePhoto); // la section fourniture prend en compte la class photo
    furniturePhoto.appendChild(furnitureImage); // la class photo prend en compte l'image
    furnitureSection.appendChild(furnitureElement); // la section fourniture prend en compte la class element 
    furnitureElement.appendChild(furnitureNom); // la class element prend en compte le nom 
    furnitureElement.appendChild(furniturePrix); // la class element prend en compte le prix 
    furnitureElement.appendChild(furnitureLien); // la class element prend en compte le lien 

    // Contenu des balises ajoutées pour le nom, le prix, et le lien
    furnitureNom.textContent = furniture.name;
    furniturePrix.textContent = furniture.price / 50 + " €";
    furnitureLien.textContent = "Commander ce produit";
    });
}
