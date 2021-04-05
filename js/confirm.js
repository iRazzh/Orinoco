/* Page confirm */

// Si l"order" de sessionStorage est différent de "null"
if (sessionStorage.getItem("order") != null) {
  // On vient le parse (analyse d'une chaîne de caractère en JSON)
  let confirm = JSON.parse(sessionStorage.getItem("order"));
  // On récupère l'ID et on remplace le texte avec l'orderId
  document.getElementById("orderId").innerHTML = confirm.orderId;
  document.getElementById("mail").innerHTML = confirm.contact.email;
  document.getElementById("address").innerHTML =  "Livraison : " + confirm.contact.address + " " + confirm.contact.city;
  // On crée une variable "somme" à 0 pour le calcul du prix total
  let somme = 0;
  // Pour chaque "article" dans "products" dans le sessionStorage, on l'additionne
  confirm.products.forEach((article) => {
    somme += article.price / 100;
    console.log(somme)
    // On affiche le total de la somme
    document.getElementById("price").textContent = "Prix total : " + somme + "€";
  })
} else {
  // S'il y a un souci, on envoie une alerte et on redirige le client sur la page d'accueil
  alert("Un problème est survenu, vous allez être redirigé automatiquement vers la page d'accueil.");
  window.location = 'index.html';
}