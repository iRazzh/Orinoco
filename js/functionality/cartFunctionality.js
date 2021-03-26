// Création du panier
    if (localStorage.getItem("cart") == undefined) {
        // Le panier est un tableau de produits
        localStorage.setItem("cart", JSON.stringify([]));
};
       
let cart = {
    add:(id) => {
        // Récupération du localStorage
        let furnituresCart = cart.read()
        furnituresCart.push(id);
        localStorage.setItem("cart", JSON.stringify(furnituresCart))
        console.info('Validation de l\'ajout au panier')
        console.info(furnituresCart + " sont présents dans le panier")
    },
    remove:() => {
        alert("salut")
    },
    read:() => {
        // Lecture du panier de l'utilisateur 
        return JSON.parse(localStorage.getItem("cart"))
    },
}

