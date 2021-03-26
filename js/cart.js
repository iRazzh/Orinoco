let struct = `<div class="produit">
<img class="img">
<h2 class="name">Coucou</h2>
<p class="prix"></p>
</div>`

function handler(furniture){
    console.log(furniture.name)
    // Traduit du texte en élément manipulable du DOM (par ex : header)
    html = new DOMParser().parseFromString(struct, "text/html")
    html.body.getElementsByClassName("name")[0].innerHTML = furniture.name
    html.body.getElementsByClassName("prix")[0].innerHTML = furniture.price
    html.body.getElementsByClassName("img")[0].setAttribute("src", furniture.imageUrl)
    // On insère, avant la fin, l'html.body.innerHTML 
    document.getElementById('productCart').insertAdjacentHTML("beforeEnd", html.body.innerHTML)
}

let products = cart.read()

if(products.length > 0){
    document.getElementById("emptyCart").remove();
    console.info('Des produits sont dans le panier')
}

products.forEach(element => {
    getOneFurniture(element).then(handler)
});

