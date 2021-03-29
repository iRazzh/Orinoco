// Création du panier

// Si le localStorage ne récupère pas d'item "cart" et qu'il y a une valeur "undefined"
if (localStorage.getItem("cart") == undefined) {
  // On ajoute la valeur récupérée à l'emplacement de stockage sous forme de tableau
  localStorage.setItem("cart", JSON.stringify([]));
}

//===============================================

// On crée une variable "cart" ayant pour propriété : 
let cart = {
    // "add" qui permet la récupération du localStorage
  add: (id) => {
    let furnituresCart = cart.read();
    // On récupère le produit par son ID 
    furnituresCart.push(id);
    localStorage.setItem("cart", JSON.stringify(furnituresCart));
    console.info("Validation de l'ajout au panier");
    console.info(furnituresCart + " sont présents dans le panier");
  }, 
  // "read" qui permet de lire le panier de l'utilisateur
  read: () => {
    return JSON.parse(localStorage.getItem("cart"));
  },
};

//===============================================