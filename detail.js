// creo i dati per entrare nell'API
const apiUrl= "https://striveschool-api.herokuapp.com/api/product/";
const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwYmRjOWQyYWRhNDAwMTQzYzFmMzUiLCJpYXQiOjE2ODYxNTg3OTMsImV4cCI6MTY4NzM2ODM5M30.xHaxU0lWwfenYutOrCJK6nejHXNmNATLBdUx8BdS2QA"

//variabili globali della Card
const newNameInput = document.getElementById("name-input");
const newDescInput = document.getElementById("desc-input");
const newBrandInput = document.getElementById("brand-input");
const newImageUrl = document.getElementById("imageUrl");
const newPriceInput = document.getElementById("price-input");
//la mia row dove appendo tutto
const myRow = document.getElementById("my-row");
//btn che edita 
const editBtn = document.getElementById('edit-btn');
//alert con time set che andrà nell' else  
const emptyField = document.getElementById("empty-fields");


//condizione principale
if (window.location.search) {
    
    //isolo l'ID
    const params = new URLSearchParams(window.location.search)
    // creo la chiamata API con l'url + id prodotto
    async function getProducts() {
        myRow.innerHTML = "";
        const res = await fetch(apiUrl + params.get("product"), {headers: {"Authorization": "Bearer "+ token }});
        const json =  await res.json();
        createTemplate(json);
        //bottone per editare eventlistener 
        editBtn.addEventListener("click", () =>{
            editProduct(json);
            
        });
    }
    window.onload = getProducts();
    

    //! funzione che crea la card prodotto e la fa vedere a schermo
    function createTemplate(element) {

        const myDiv1 = document.createElement("div");
        myDiv1.classList.add("img-cont");
        const myDiv2= document.createElement("div");
        myDiv2.classList.add("card-body-cont");

        const myCard = document.createElement("div");
        myCard.classList.add("card");

        const cardImg = document.createElement("img");
        cardImg.src = element.imageUrl;
        cardImg.classList.add("img-fluid");
        

        const myCardBody = document.createElement("div");
        myCardBody.classList.add("my-card-body");
        
        const myCardName = document.createElement("h2");
        myCardName.classList.add("card-title");
        myCardName.innerText = element.name;
       
        const myCardDesc = document.createElement("p"); 
        myCardDesc.classList.add("card-text");
        myCardDesc.innerText = element.description;
        
        const myCardBrand = document.createElement("h5");
        myCardBrand.classList.add("card-subtitle", "mb-2", "text-muted");
        myCardBrand.innerText = element.brand;
        
        const myCardPrice = document.createElement("p");
        myCardPrice.classList.add("card-text");
        myCardPrice.innerText = "Price: €" + element.price;

        //btn Delete
        const delBtn = document.createElement('button');
        delBtn.classList.add("btn-danger", "btn-small", "p-3","ms-2", "btn"); 
        delBtn.innerText = "Delete Product";

        myDiv1.append(myCard);
        myCard.append(cardImg, myCardBody);
        myCardBody.append(myCardName, myCardBrand, myCardDesc, myCardPrice, delBtn);
        myRow.append(myDiv1);

    
        delBtn.onclick = () => {deleteProduct(productId);}

        //bottone MODALE
        let productId = element._id
        const editBtn = document.createElement('button');
        editBtn.classList.add("btn-primary", "btn-small", "p-3","ms-2", "btn");  
        editBtn.setAttribute("data-bs-toggle", "modal");
        editBtn.setAttribute("data-bs-target", "#staticBackdrop");
        editBtn.innerText = "Edit Product";

       
        myDiv1.appendChild(cardImg);
        myDiv2.appendChild(myCardBody);
        
        myCardBody.append(myCardName, myCardBrand, myCardDesc, myCardPrice, editBtn, delBtn);
        myRow.classList.add("d-flex", "justify-content-center", "align-items-center");
        myDiv1.classList.add("mb-2");
        myRow.append(myDiv1, myDiv2);
    }

    // funzione che apre modale e modifica elemento
    async function editProduct(element) {
        if (newNameInput.value && newDescInput.value && newBrandInput.value && newImageUrl.value && newPriceInput.value) {
        const payload = {
            "name": newNameInput.value, 
            "description": newDescInput.value,
            "brand": newBrandInput.value,
            "imageUrl": newImageUrl.value,
            "price": newPriceInput.value,
        };
        const modResult = await fetch(apiUrl + params.get('product'), {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+ token
            }
        });
        getProducts();
        modNameInput.innerHTML = "";
        modDescInput.innerHTML = "";
        modBrandInput.innerHTML = "";
        modImageUrl.innerHTML = "";
        modPriceInput.innerHTML = "";
        }else {
            console.log("valorizza tutti i campi richiesti");
            emptyField.classList.toggle("d-none");
            setTimeout(() => {
                emptyField.classList.toggle("d-none");
            }, 5000);
        }
    }
    //funzione elimina prodotto con method DELETE che richiamerò su nel delbtn
async function deleteProduct(elementID) {
    const deleteResult = await fetch(apiUrl + elementID, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+ token
        }
    })
    console.log(elementID);
    getProducts();
}
} 

