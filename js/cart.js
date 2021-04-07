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

/* Formulaire */

let contact;

let objet = {};

document
  .getElementById("inscription")
  .addEventListener("submit", function (element) {
    // Création des différents regex
    const regexLetters = /[A-Za-z]/;
    const regexNumber = /[0-9]/;
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const regexSpecialsCharacters = /[§!@#$%^&*().?":{}|<>]/;

    // Récupération de chaque ID du formulaire
    let lastName = document.getElementById("lastName");
    let firstName = document.getElementById("firstName");
    let email = document.getElementById("email");
    let address = document.getElementById("address");
    let city = document.getElementById("city");

    // Création d'une variable "erreur" pour la gestion et l'affichage des erreurs
    let erreur;

    // Vérification : nom
    if (
      regexNumber.test(lastName.value) == true ||
      regexSpecialsCharacters.test(lastName.value) == true
    ) {
      erreur = "Veuillez renseignez un nom valide.";
    } else {
      console.info("Nom valide");
    }
    // Vérification : prénom
    if (
      regexNumber.test(firstName.value) == true ||
      regexSpecialsCharacters.test(firstName.value) == true
    ) {
      erreur = "Veuillez renseignez un prénom valide.";
    } else {
      console.info("Prénom valide");
    }
    // Vérification : email
    if (regexMail.test(email.value) == false) {
      erreur = "Veuillez renseignez un email valide.";
    } else {
      console.info("Email valide");
    }
    // Vérification : adresse
    if (
      (regexNumber.test(address.value) == false &&
        regexLetters.test(address.value) == true) ||
      (regexNumber.test(address.value) == true &&
        regexLetters.test(address.value) == false) ||
      regexSpecialsCharacters.test(address.value) == true
    ) {
      erreur = "Veuillez renseignez une adresse valide.";
    } else {
      console.info("Adresse valide");
    }
    // Vérification : ville
    if (
      regexNumber.test(city.value) == true ||
      regexSpecialsCharacters.test(city.value) == true
    ) {
      erreur = "Veuillez renseignez une ville valide.";
    } else {
      console.info("Ville valide");
    }
    // Mise en place de l'erreur
    element.preventDefault();
    if (erreur) {
      document.getElementById("error").innerHTML = erreur;
      return false;
      // S'il n'y a pas d'erreur, on place la valeur de chaque élément dans "contact"
    } else {
      contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      };
      // On place "contact" et "products" dans l'objet qui va être envoyé
      objet = {
        contact: contact,
        products: products,
      };
      // On envoie le formulaire grâce à "sendForm"
      let envoi = JSON.stringify(objet);
      let commande = sendForm(envoi).then((response) => {
        console.log(response);
      });
      // Une fois envoyé, on clear le localStorage
      localStorage.clear();
    }
  });

//===============================================
