var carts = [
    // {
    //     id: 1230,
    //     title: "Title",
    //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur amet blanditiis consectetur quas doloribus sunt, impedit est dolores aut et. ",
    //     price: 10
    // }
]


const cartContainer = document.querySelector('.cart__container');
const addButton = document.querySelector('#addButton');
const searchForm = document.querySelector('.search');
const  deleteButton = document.querySelectorAll('#id');
const totalPrice = document.querySelector('#total');
const deleteCart = document.querySelector("#delete-cart");


const handleDeleteCart = () => {
    carts = [];
    render();
}

deleteCart.addEventListener("click", handleDeleteCart)

//search 
const handleSearch  = (e) => {
    e.preventDefault();
    const searchQuery = document.querySelector('[name = "search"]');
    if(searchQuery.value !== ""){
        let query = searchQuery.value.toLowerCase()
       carts =  carts.filter(cart => cart.title.toLowerCase().includes(query));
        render()
    } 
}

searchForm.addEventListener("submit", handleSearch)



const addElement = (e) => {
    e.preventDefault();
    const price = document.querySelector('[name = "price"]');
    const description = document.querySelector('[name = "description"]');
    const title = document.querySelector('[name="title"]');
    const id = Math.floor(Math.random() * 100);

    if(price.value !== "" && description.value !== "" && title.value !== ""){
        const item = {
           price: parseFloat(price.value),
           title: title.value,
           description: description.value,
            id
        }
        carts.unshift(item);
        price.value = "";
        title.value = "";
        description.value = "";
        console.log(carts);
        render(carts)
    }
}

addButton.addEventListener("click", addElement)


//calculate totals 
const calculateTotal = () => {
  var totalAmount = carts.reduce((acc, price) => {
       return acc += price
    })
}

const render = () => {
   cartContainer.innerHTML = "";
   if(carts.length !== 0){
    carts.map(e => {
        let item = document.createElement("div");
        let removeButton = document.createElement("button");
        let title = document.createElement("h5");
        let description = document.createElement("p");
        let price = document.createElement("strong");
    
        item.classList.add("card");
        removeButton.classList.add("btn");
        removeButton.classList.add("btn-danger")
        removeButton.setAttribute("id", e.id)
    
        removeButton.innerText = "Remove from Cart";
        title.innerHTML= e.title;
        description.innerHTML = e.description;
        price.innerHTML = "$" + e.price;
    
        //handle delete
        removeButton.addEventListener("click", () => {
           console.log("clicked")
           carts = carts.filter(cart => cart.id !== e.id);
           console.log(carts)
           render();

        })
    
        item.appendChild(title);
        item.appendChild(description);
        item.appendChild(price);
        item.appendChild(removeButton);
    
        cartContainer.appendChild(item)
    
    })
  }
  else{
    cartContainer.innerHTML = "No items available";
  }

   let  totalAmount;
   if(carts.length === 1){
       totalAmount = carts[0].price
   }
   else if(carts.length <=0){
       totalAmount = 0
   }
   else{
      totalAmount =  carts.reduce((acc, item) => {
           return acc.price += item.price
       })
   }

   totalPrice.innerText= totalAmount


    
}

render();

 
