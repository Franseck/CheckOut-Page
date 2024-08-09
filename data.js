let products = [
    {
        id: 1,
        name: 'BangOlufsen',
        image: '1.jpg',
        price: 5400
    },
    {
        id: 2,
        name: 'KLH',
        image: '2.jpg',
        price: 14000
    },
    {
        id: 3,
        name: 'MarshallStanmore',
        image: '3.jpg',
        price: 550
    },
    {
        id: 4,
        name: 'MarshallNC',
        image: '4.png',
        price: 300
    },
    {
        id: 5,
        name: 'Bose',
        image: '5.jpg',
        price: 449
    },
    {
        id: 6,
        name: 'Sennheiser',
        image: '6.jpg',
        price: 220
    }
];

const openShopping = document.querySelector(".shopping")
const closeShopping = document.querySelector(".closeShopping")
const list = document.querySelector(".list")
const listCard = document.querySelector(".listCard")
const body = document.querySelector("body")
const quantity = document.querySelector(".quantity")
const total = document.querySelector(".total")

openShopping.addEventListener("click", () => {
    body.classList.add("active");
})
closeShopping.addEventListener("click",()=>{
body.classList.remove("active")
})

let listCards =[] ; 
function prodPush() {
products.forEach((value,key)=> {
let newDiv = document.createElement("div");
newDiv.classList.add("item");
newDiv.innerHTML= `
<img src="./img/${value.image}">
<div class="title">${value.name}</div>
<div class="price">${value.price.toLocaleString()}</div>
<button onclick="addToCard(${key})">Add To Card</button>
` ;
list.appendChild(newDiv);
})
}
prodPush();

function addToCard(key) {
    if(listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity=1 ;
         }
         reLoadCard()
}
function reLoadCard () {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

listCards.forEach((value,key)=> {
totalPrice=totalPrice+value.price;
count = count + value.quantity;

if( value != null){
    let newDiv = document.createElement("li");
    newDiv.innerHTML = `
    <div><img src="./img/${value.image}"></div>
     <div ${value.name}</div>
    <div>${value.price.toLocaleString()}</div>
    <div>
<button onclick="changeQuantity(${key}, ${value.quantity - 1})">-<button>
<div class="count">${value.quantity}</div>
<button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
</div>  `
listCard.appendChild(newDiv);}
})

total.innerText = totalPrice.toLocaleString();
quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reLoadCard();
}