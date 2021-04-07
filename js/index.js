/* Page Index */

//===============================================

// On crée la structure HTML grâce à << ` ` >>
// qui définit une chaîne de caractère et permet d'intégrer des expressions
let struct = `
<div class="furniture--container"> 
    <a class="link">
    <img class="image">
        <div class="furniture--element">
        <h2 class="furniture--name"></h2>
        <p class="furniture--price"></p>
        </div>
    </a>
</div> `;

// On attribut à la fonction "handler", le paramètre "furnitures"
// la fonction "handler" va permettre de traiter les données de l'API
// le paramètre "furnitures" stocke les données de l'API
function handler(furnitures) {
  // Pour chaque "furniture", on analyse le code source HTML grâce au "DOMParser"
  // et on le transforme en élément manipulable du DOM
  furnitures.forEach((furniture) => {
    html = new DOMParser().parseFromString(struct, "text/html");
    html.body
      .getElementsByClassName("link")[0]
      .setAttribute("href", "produits.html?id=" + furniture._id); // On récupère l'ID en fonction du produit
    img = html.body.getElementsByClassName("image")[0];
    img.setAttribute("src", furniture.imageUrl); // On ajoute l'imageUrl
    img.setAttribute("alt", "Photo" + furniture.name); // On ajoute à l'attribut "alt" le nom du produit sélectionné
    html.body.getElementsByClassName("furniture--name")[0].innerHTML =
      furniture.name; // On remplace le nom du produit
    html.body.getElementsByClassName("furniture--price")[0].innerHTML =
      furniture.price / 100 + " €"; // On remplace le prix du produit
    // On insère tous les éléments avant la fin de l'ID "listFurnitures" qu'on a récupéré
    document
      .getElementById("listFurnitures")
      .insertAdjacentHTML("beforeEnd", html.body.innerHTML);
  });
}

//===============================================

// On appelle l'API contenant TOUS les produits, on lui envoie un objet Promise ".then"
// et elle nous renvoie une réponse "handler" qui permet de traiter les données de l'API
getAllFurnitures().then(handler);

//===============================================
