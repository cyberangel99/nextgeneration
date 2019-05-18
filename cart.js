$(document).ready(function () {
    // Load products file
    $("#products-hidden").load('products.json', function (results) {
        const products = JSON.parse(results) // Our products, .parse converts the string into json
        products.map(function (product) {// .map loops the products, jquery prepend inserts content at the beginning of the elements
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

    $("#clothing_type :checkbox").change()//how to obtain all the checkboxes under that id div












});