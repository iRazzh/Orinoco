// Lien API pour tous les produits API
let getAllFurnitures = function () {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status === 200) {
        resolve(JSON.parse(this.responseText));
        console.log("Admin : OK !");
      } else {
        console.log("Admin : ERROR connection API failed");
      }
    };
    request.open("GET", "http://localhost:3000/api/furniture");
    request.send();
  });
};

// Lien API pour récupérer l'ID
let getOneFurniture = function (idFurniture) {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status === 200) {
        console.log("Admin : OK !");
        resolve(JSON.parse(this.responseText));
      } else if (this.status === 500 || this.status === 404) {
        console.log("Admin : ERROR product not found");
        resolve(null);
      } else if (idFurniture === "") {
        console.log("Admin : ERROR id not found")
        alert("Un souci avec l'identifiant du produit a été détecté. Vous allez être redirigé vers la page d'accueil")
        document.location.href = "index.html";
      } else {
        console.log("Admin : ERROR connection API failed");
      }
    };
    request.open(
      "GET",
      "http://localhost:3000/api/furniture" + "/" + idFurniture
    );
    request.send();
  });
};

// Lien API pour l'envoie du formulaire
let sendForm = function (object) {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status === 201) {
        sessionStorage.setItem("order", this.responseText);
        window.location = "confirm.html";
        resolve(JSON.parse(this.responseText));
      }
    };
    request.open("POST", "http://localhost:3000/api/furniture" + "/" + "order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(object);
  });
};
