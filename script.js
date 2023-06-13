// creo i dati per entrare nell'API
const apiUrl= "https://striveschool-api.herokuapp.com/api/product/";
const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwYmRjOWQyYWRhNDAwMTQzYzFmMzUiLCJpYXQiOjE2ODYxNTg3OTMsImV4cCI6MTY4NzM2ODM5M30.xHaxU0lWwfenYutOrCJK6nejHXNmNATLBdUx8BdS2QA"

//variabili globali della Card
const nameInput = document.getElementById("name-input");
const descInput = document.getElementById("desc-input");
const brandInput = document.getElementById("brand-input");
const imageUrl = document.getElementById("imageUrl");
const priceInput = document.getElementById("price-input");
//la mia row dove appendo tutto
const myRow = document.getElementById("my-row");
//bottone dove aggiungero eventlistener per far partire la funzione che crea il prodotto
const createBtn = document.getElementById("create-btn");
//alert con time set che andrà nell' else  
const emptyField = document.getElementById("empty-fields");


//faccio il mio window on load per avere sempre caricato a inizio pagina 


//Chiamata API
async function getProducts() {
    //inizio pulito
    myRow.innerHTML="";
    //chiamata all'API secondo le direttive richieste
    const res = await fetch(apiUrl, {headers: {"Authorization": "Bearer " + token}});
    // restituisce il valore della chiamata trasformato da stinga in oggetto JSON
    const json = await res.json();

    //ciclo il mio oggetto JSON per ogni elemento per crearvici all'interno la struttura template
    json.forEach((element) => {
        createCardTemplate(element);
    });
    console.log(json);
}
window.onload = getProducts();

//creo la funzione che scaturisce dal click del btn che crea il mio prodotto 
createBtn.addEventListener("click", newProduct);

//funzione newProduct che crea il nuovo prodotto(oggetto) e lo posta(POST) nel server
async function newProduct() {
    //condizione perchè il prodotto possa essere creato
    if(nameInput.value && descInput.value && brandInput.value && imageUrl.value && priceInput.value) {
       //creo l'oggetto che pusherò in stringify
        const payload = {
            "name": nameInput.value,
            "description": descInput.value,
            "brand": brandInput.value,
            "imageUrl": imageUrl.value,
            "price": priceInput.value,
        };
        //method POST
        const createResult = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        //metto tutti i miei input in modo che risultino vuoti 
        getProducts();
        nameInput.value = "";
        descInput.value = "";
        brandInput.value = "";
        imageUrl.value = "";
        priceInput.value = "";
    }
    else{
        console.log("valorizza tutti i campi richiesti");
        emptyField.classList.toggle("d-none");
        setTimeout(()=>{
            emptyField.classList.toggle("d-none");
        }, 5000);
    }
}

//funzione che crea il template della Card Prodotto 
function createCardTemplate(element) {
    //valorizzo l'ID del prodotto
    let productId = element._id;

    //creo la Card secondo Bootstrap
    const myDiv = document.createElement("div");
    myDiv.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "p-3", "d-flex", "justify-content-center", "mt-5"); 
    
    const myCard = document.createElement("div");
    myCard.classList.add("card", "d-flex", "align-items-center");
    
    const cardImg = document.createElement("img");
    cardImg.src = element.imageUrl;
    cardImg.classList.add("card-img-top", "h-100", "imgBg");
    
    const myCardBody = document.createElement("div");
    myCardBody.classList.add("card-body-2");
    
    const myCardName = document.createElement("h5");
    myCardName.classList.add("card-title");
    myCardName.innerText = element.name;
    
    const myCardDesc = document.createElement("p"); 
    myCardDesc.classList.add("card-text", "Txt");
    myCardDesc.innerText = element.description;
    
    const myCardBrand = document.createElement("h6");
    myCardBrand.classList.add("card-subtitle", "mb-2", "text-muted");
    myCardBrand.innerText = element.brand;
    
    const myCardPrice = document.createElement("p");
    myCardPrice.classList.add("card-text");
    myCardPrice.innerText = "Price: €" + element.price;
    
    const moreInfo = document.createElement("a");
    moreInfo.href= "details.html?product=" + productId;
    moreInfo.innerText = "Click for Details";
    moreInfo.classList.add("text-dark", "text-decoration-none", "bg-primary");


    myDiv.append(myCard);
    myCard.append(cardImg, myCardBody);
    myCardBody.append(myCardName, myCardBrand, myCardDesc, myCardPrice, moreInfo);
    myRow.append(myDiv);

}

