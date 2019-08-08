$(document).ready(function () {
    //Initialize toaster options
    $('.toast').toast({
        delay: 6000
    })
    //If the cart does not exist
    if(!localStorage.getItem('cart')) {//Initialize the cart if it doesn't exist
        localStorage.setItem('cart', JSON.stringify([]))//used stringify to turn the array to a string for local storage, local storage wants everything into a string
    }
    displayProducts();// Load products file, refreshes the cart
    
    updateCartBadge();//initial badge count-lets browser know to get badge count on page load

    //search filter
    const searchBar = document.getElementById('searchBox');
    searchBar.addEventListener('keyup', function (e) {
        const term = e.target.value.toLowerCase();
        const products = JSON.parse(localStorage.getItem('products'))
        //clears the other products that are not searched when an item is searched
        $("#products").html("");
        //shows the product that is searched
        products.filter(p => {
            console.log(p.name.toLowerCase().indexOf(term))
            if (p.name.toLowerCase().indexOf(term) > -1) {
                showProduct(p);
            }
        })
    })
    //on click for the add to cart button
    $(document).on("click", ".add-cart-button", function() {//this event is done after the page is loaded and the products are loaded, use only document .on("click")
       let product = $(this).parent('.card-body').find('.prod').val()
       product = parseInt(product) //parseInt turns the id from a string into a integer or number from the json file.
       addToCart(product);
       showToast('Product Added!', product);
    });
    $(document).on("click", ".delete-cart-button", function() {//this deletes the item from the cart
       let product = $(this).parent('.card-body').find('.prod').val()
       product = parseInt(product) //parseInt turns the id from a string into a integer or number from the json file.
       removeFromCart(product);
       showToast('Product Removed!', product)
    });
});


//Handle showing toast
showToast = (productMsg = '', productId) => {
    const product = JSON.parse(localStorage.getItem('products')).filter(p => p.id === productId)[0] //Filter the product array to show only the product that matches the passed in product id
    //Set toaster options: https://getbootstrap.com/docs/4.3/components/toasts/#toastoptions
    $('.toast').toast('show')
    //Fill in product info
    $('.toast .productMsg').html(productMsg)
    $('.toast .productName').html(product.name)
    $('.toast .productDesc').html(product.description)
    $('.toast .productPrice').html(product.price)
    $('.toast .productImg').attr('alt', product.name)
    $('.toast .productImg').attr('src', product.image)
}
//these functions are outside of document ready so they won't start until they is called.
// Refactored (abstracted) code to keep the codebase DRY (Don't Repeat Yourself)
//this function is pushing the item to the cart
 addToCart = product => {
    let cart = JSON.parse(localStorage.getItem('cart'))//takes the string array from local storage and turns it into an array 
    if ($.inArray(product, cart) === -1) {//prevents duplication in the cart
        cart.push(product);//pushes the product to the cart array
        localStorage.setItem('cart', JSON.stringify(cart))//reassigning the new cart to the cart key in local storage. resetting the cart so it shows the product in the new cart array
        updateCartBadge();//updating the badge count
        displayProducts();
    }
}

//removes items from the cart
removeFromCart = product => {
    let cart = JSON.parse(localStorage.getItem('cart'))//takes the string array from local storage and turns it into an array 
    if ($.inArray(product, cart) > -1) {//check to see it the item is in the cart, then it removes it.
        cart = cart.filter(item => item !== product)//if the item is not equal to the product, it leaves it in the cart //reassigning the cart value //filters thru the cart and removes item that is passed in 
        localStorage.setItem('cart', JSON.stringify(cart))//reassigning the new cart to the cart key in local storage. resetting the cart so it shows the product in the new cart array
        updateCartBadge();//updating the badge count
        displayProducts();
    }
}
//Stopped at removefromcart, add a remove cart button based on if the item is in the cart. toggle show and hide from bootstrap

//displays the product card on browser/UI
 showProduct = product => {//this function shows the add to and delete cart button
    let cart = JSON.parse(localStorage.getItem('cart'))
     const inCartAddClass = cart.indexOf(product.id) > -1 ? 'd-none' : 'd-block'//if the item is in the cart, display none for the add item to cart button, if not in the cart, display block
     const inCartDeleteClass = cart.indexOf(product.id) > -1 ? 'd-block' : 'd-none'//if the item is in the cart, show the delete button, if not hide it with display none.
    $("#products").prepend(`
        <div class="col-md-4 mt-4">
            <div class="card">
                <img src=${product.image} class="card-img-top" alt="shoe">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">${product.price}</p>
                    <button type="button" class="btn btn-primary ${inCartDeleteClass} delete-cart-button">Remove From Cart</button>
                    <button type="button" class="btn btn-primary ${inCartAddClass} add-cart-button">Add To Cart</button>
                    <input class="prod" type="hidden" value=${product.id} />
                </div>
            </div>
        </div>
    `)
}
//a function that updates the badge count
updateCartBadge = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    $(".cartBadge").html(cart.length)//creates the count badge of how many items in the cart.
}

displayProducts = () => {
    $("#products").html('')//clears the products from html so it won't prepend every time its added to the cart
    $("#products-hidden").load('products.json', function (results) {
        const products = JSON.parse(results) // Our products, .parse converts the results string into json
        localStorage.setItem('products', results)
        products.map(function (product) {// .map loops the products, jquery prepend inserts content at the beginning of the elements
            showProduct(product)
        })
    })
}