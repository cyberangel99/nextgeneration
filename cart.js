$(document).ready(function () {
    // Load products file
    $("#products-hidden").load('products.json', function (results) {
        const products = JSON.parse(results) // Our products, .parse converts the string into json
        localStorage.setItem('products', results)
        products.map(function (product) {// .map loops the products, jquery prepend inserts content at the beginning of the elements
            showProducts(product)
        })
    })

    $("#clothing_type :checkbox").change(function (e) {//how to obtain all the checkboxes under that id div
        var value = e.target.value//how to get the value of an event user input
        localStorage.setItem("clothing", value);//storing data in local storage
    })

    //search filter
    const searchBar = document.getElementById('searchBox');
    searchBar.addEventListener('keyup', function (e) {
        const term = e.target.value.toLowerCase();
        const products = JSON.parse(localStorage.getItem('products'))
        //clears the other products that are not searched when an item is searched
        $("#products").html("");
        products.filter(p => {
            if (p.name.toLowerCase().indexOf(term) > -1) {
                showProducts(p);
            }
        })
    })
});

// Refactored (abstracted) code to keep the codebase DRY (Don't Repeat Yourself)
 showProducts = product => {
    $("#products").prepend(`
        <div class="col-md-4 mt-4">
            <div class="card">
                <img src=${product.image} class="card-img-top" alt="shoe">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">${product.price}</p>
                </div>
            </div>
        </div>
    `)
}