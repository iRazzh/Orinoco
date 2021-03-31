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

document.getElementById("inscription").addEventListener("submit", function(element){
  let erreur;

  const regexLetters = /[A-Za-z]/;
  const regexNumber = /[0-9]/;
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const regexSpecialsCharacters = /[§!@#$%^&*().?":{}|<>]/;

  let lastName = document.getElementById("lastName");
  let firstName = document.getElementById("firstName");
  let email = document.getElementById("email");
  let address = document.getElementById("address");
  let city = document.getElementById("city");

  if(regexNumber.test(lastName.value) == true || regexSpecialsCharacters.test(lastName.value) == true){
    erreur = "Veuillez renseignez un nom valide."
  } else {
    console.info("Nom valide")
  }
  if(regexNumber.test(firstName.value) == true || regexSpecialsCharacters.test(firstName.value) == true){
    erreur = "Veuillez renseignez un prénom valide."
  } else {
    console.info("Prénom valide")
  }
  if(regexMail.test(email.value) == false){
    erreur = "Veuillez renseignez un email valide."
  } else {
    console.info("Email valide")
  }
  if((regexNumber.test(address.value) == false && regexLetters.test(address.value) == true) || (regexNumber.test(address.value) == true && regexLetters.test(address.value) == false) || regexSpecialsCharacters.test(address.value) == true){
    erreur = "Veuillez renseignez une adresse valide."
  } else {
    console.info("Adresse valide")
  }
  if(regexNumber.test(city.value) == true || regexSpecialsCharacters.test(city.value) == true){
    erreur = "Veuillez renseignez une ville valide."
  } else {
    console.info("Ville valide")
  }
  if (erreur) {
    element.preventDefault();
    document.getElementById("error").innerHTML = erreur;
    return false
  } else {
    alert("Formulaire envoyé!")
  }
})






/*

// Vérification des différents input dans le formulaire
// Vérification : lastName 
  if( regexNumber.test(lastName) == false || regexSpecialsCharacters.test(lastName) == false || lastName ==""){
    console.info('Admin : Le nom est correct')
  }
  // Vérification : firstName
  if(regexNumber.test(firstName) == true || regexSpecialsCharacters.test(firstName) == true && value.length < 2){

  } else {
    console.info('Admin : Le prénom est correct')
  }
  // Vérification : email 
  if(regexMail.test(email) == false && regexSpecialsCharacters.test(email) == true){

  } else {
    console.info('Admin : L\'email est correct')
  }
  // Vérification : address 
  if(regexSpecialsCharacters.test(address) == true || regexNumber.test(address) == false){

  } else {
    console.info('Admin : L\'adresse postale est correcte')
  }
  // Vérification : city
  if(regexNumber.test(city) == true || regexSpecialsCharacters.test(city) == true && value.length < 1){

  } else {
    console.info('Admin : La ville est correcte')
  }
}*/


