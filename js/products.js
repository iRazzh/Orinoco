// Création de la page produit

const queryString = window.location.search;
console.log(queryString);
// Récupération de l'ID du produit situé dans l'URL
const urlParams = new URLSearchParams(queryString);
idFromUrl = urlParams.get("id");

function handler(furniture){
    // Si furniture est égal à null, on envoie une alerte avec une redirection
if (furniture == null) {
    alert(
      "Un souci avec l'URL est survenue, vous allez être redirigé vers la page d'accueil."
    );
    document.location.href = "index.html"; // Redirection vers l'index
  }
  
  document
    .getElementById("details__photo") // On récupère l'ID "details__photo",
    .setAttribute("src", furniture.imageUrl); // et on lui attribut le src de l'image dans l'API
  document.getElementById("details__section--name").innerHTML = furniture.name; // On récupère l'ID "details__section--name", // et on définit la syntaxe HTML situé dans l'API concernant le nom
  document.getElementById("details__section--description").innerHTML = // On récupère l'ID "details__section--description",
    furniture.description; // et on définit la syntaxe HTML situé dans l'API concernant la description
  document.getElementById("details__section--price").innerHTML = // On récupère l'ID "details__section--price",
    "Prix : " + furniture.price / 100 + "<b> €</b>"; // et on définit la syntaxe HTML situé dans l'API concernant le prix
  
  // Pour chaque "furniture" ayant "varnish", on lui crée un élément option HTML, on le met "enfant" de l'ID, et on définit sa syntaxe situé dans l'API
  furniture.varnish.forEach((product) => {
    let optionProduct = document.createElement("option");
    document
      .getElementById("varnish")
      .appendChild(optionProduct).innerHTML = product;
  });
}

getOneFurniture(idFromUrl).then(handler);


/* Ajout de l'article au panier */
// Au click du client, on met le produit dans le panier

document.getElementById("command").addEventListener("click", function() {
    cart.add(idFromUrl)
})

