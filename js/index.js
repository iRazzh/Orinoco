let struct = `
<div class="furniture--container">
    <a class="link">
    <img class="image">
        <div class="furniture--element">
        <h2 class="furniture--name"></h2>
        <p class="furniture--price"></p>
        </div>
    </a>
</div> `

function handler(furnitures){
    furnitures.forEach(furniture => {
    html = new DOMParser().parseFromString(struct, "text/html")
    html.body.getElementsByClassName("link")[0].setAttribute("href", "produits.html?id=" + furniture._id)
    img = html.body.getElementsByClassName("image")[0]
    img.setAttribute("src", furniture.imageUrl)
    img.setAttribute("alt", "Photo" + furniture.name)
    html.body.getElementsByClassName("furniture--name")[0].innerHTML = furniture.name
    html.body.getElementsByClassName("furniture--price")[0].innerHTML = furniture.price / 100 + " €"
    document.getElementById('listFurnitures').insertAdjacentHTML("beforeEnd", html.body.innerHTML)
    })
}

getAllFurnitures().then(handler);

