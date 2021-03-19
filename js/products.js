/* Lien API */ 

let getAllFurnitures = function (){
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status === 200){
                resolve(JSON.parse(this.responseText));
                console.log("Admin : OK !");
            } else {
                console.log("Admin : ERROR connection API failed");
            }
        };
        request.open("GET", "http://localhost:3000/api/furniture" + '/' + idFurniture);
        request.send();
    });
};
idFurniture= "";

async function productsFurniture(){
        const queryString = window.location.search
        console.log(queryString)
        const urlParams = new URLSearchParams(queryString)
        idFurniture = urlParams.get("id")

        const furnitures = await getAllFurnitures()

        document.getElementById("details__photo")
        .setAttribute("src", furnitures.imageUrl)
        document.getElementById("details__section--name")
        .innerHTML = furnitures.name
        document.getElementById("details__section--description")
        .innerHTML = furnitures.description
        document.getElementById("details__section--price")
        .innerHTML = "Prix : " + furnitures.price / 50 + "€"
}