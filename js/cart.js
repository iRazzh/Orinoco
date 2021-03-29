/* Page : cart */

let total = 0;

//===============================================

// On crée la structure HTML grâce à << ` ` >>
// qui définit une chaîne de caractère et permet d'intégrer des expressions
let struct = `<div class="produit">
<img class="img">
<h2 class="name">Coucou</h2>
<p class="prix"></p>
</div>`;

// On attribut à la fonction "handler", le paramètre "furniture"
// la fonction "handler" va permettre de traiter les données de l'API
// le paramètre "furniture" stocke les données de l'API
function handler(furniture) {
  // Pour chaque "furniture", on analyse le code source HTML grâce au "DOMParser"
  // et on le transforme en élément manipulable du DOM
  html = new DOMParser().parseFromString(struct, "text/html");
  html.body
    .getElementsByClassName("img")[0]
    .setAttribute("src", furniture.imageUrl); // On ajoute l'image
  html.body.getElementsByClassName("name")[0].innerHTML = furniture.name; // On remplace par le nom
  html.body.getElementsByClassName("prix")[0].innerHTML =
    furniture.price / 100 + " €"; // On remplace par le prix
  // On insère tous les éléments avant la fin de l'ID "productCart" qu'on a récupéré
  document
    .getElementById("productCart")
    .insertAdjacentHTML("beforeEnd", html.body.innerHTML);
  // Total du prix
  total = total + furniture.price / 100;
  console.log("Admin : Le prix total est de : " + total);
  // Affichage du prix total
  document.getElementById("total").textContent = "Prix total : " + total + " €";
}

//===============================================

// On crée une variable "products"
// ayant "cart" qui est l'objet panier + ".read" qui permet de voir ce qu'il contient
let products = cart.read();

// On remove l'emptyCart si il y a au moins un produit dans le panier
if (products.length > 0) {
  document.getElementById("emptyCart").remove();
  console.info("Des produits sont dans le panier");
}
// S'il y a un nombre inférieur ou égal à 0, le bouton "remove" disparaît
if (products.length <= 0) {
  document.getElementById("removeCart").remove();
  document.getElementById("total").remove();
}

//===============================================

// Pour chaque "element" qu'on a dans "products"
products.forEach((element) => {
  // On lui envoie une promesse et nous répond avec "handler" qui permet de traiter les données de l'API
  getOneFurniture(element).then(handler);
});

//===============================================

// On crée une variable "remove"
let remove = document.getElementById("removeCart");
// Au click du button, on supprime entièrement le panier
remove.onclick = function () {
  localStorage.removeItem("cart");
  // On recharge la page
  window.location.reload();
};

//===============================================
