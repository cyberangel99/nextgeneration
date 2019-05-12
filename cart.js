$(document).ready(function(){
    // Load products file
    $("#products-hidden").load('products.json', function(results) {
        const products = JSON.parse(results) // Our products
        products.map(function(product) {
            $("#products").prepend(`
                <div class="col-md-4 mt-4">
                    <div class="card">
                    <img src=${product.image} class="card-img-top" alt="shoe">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                    </div>
                    </div>
                </div>
            `)
        })
    })
});