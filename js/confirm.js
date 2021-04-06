/* Page confirm */

//===============================================

// Si l"order" de sessionStorage est différent de "null"
if (sessionStorage.getItem("order") != null) {
  // On vient le parse (analyse d'une chaîne de caractère en JSON)
  let confirm = JSON.parse(sessionStorage.getItem("order"));
  // On récupère l'ID et on remplace le texte avec l'orderId
  document.getElementsByClassName("orderId")[0].innerHTML = confirm.orderId;
  document.getElementsByClassName("mail")[0].innerHTML = confirm.contact.email;
  document.getElementsByClassName("address")[0].innerHTML = confirm.contact.address + " " + confirm.contact.city;
  document.getElementsByClassName("identity")[0].innerHTML = confirm.contact.lastName + " " + confirm.contact.firstName;
  // On crée une variable "somme" à 0 pour le calcul du prix total
  let somme = 0;
  // Pour chaque "article" dans "products" dans le sessionStorage, on l'additionne
  confirm.products.forEach((article) => {
    somme += article.price / 100;
    console.log(somme)
    // On affiche le total de la somme
    document.getElementsByClassName("price")[0].textContent = "Prix total : " + somme + "€";
  })
  sessionStorage.clear();
} else {
  // S'il y a un souci, on envoie une alerte et on redirige le client sur la page d'accueil
  alert("Un problème est survenu, vous allez être redirigé automatiquement vers la page d'accueil.");
  window.location = 'index.html';
}

//===============================================