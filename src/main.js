// variables
var cart = []
// function and definitions
function renderCart() {
    // clearing out the existing table
    $("#cart").empty()
    var markup = `
        <table>
            <thead>
            <tr>
                <td>id</td>
                <td>image</td>
                <td>name</td>
                <td>price</td>
                <td>quantity</td>
            </tr>
            </thead>
    `
    cart.forEach(i => {
        markup += `
        <tbody>
        <tr>
            <td>${i.id}</td>
            <td><img src="images/${i.image}" width="40px" height="40px"></td>
            <td>${i.name}</td>
            <td>${i.price}</td>
            <td>${i.quantity}</td>
        </tr>
        </tbody>
        `
    })
    markup += `</table>`
    $("#cart").append(markup)
}
function renderProducts() {
    var markup = ''
    products.forEach(i => {
        // console.log(i)
        markup += `
        <div id="product-${i.id}" class="product">
            <img src="images/${i.image}">
            <h3 class="title"><a href="#">${i.name}</a></h3>
            <span>Price: $${i.price}.00</span>
            <a class="add-to-cart" href="#" data="${i.id}">Add To Cart</a>
        </div>
        `
    });
    $("#products").append(markup)
}
renderProducts()

// fetch products by properties
function fetchProductsByProperties(list, prop, value) {
    var obj = {}
    list.forEach(i => {
        if (i[prop] == value) {
            obj = i
        }
    });
    return obj
}
function increaseQuantityById(list, id, quantity = 1) {
    console.log("quantity is ", quantity)
    list.forEach(i => {
        if (i.id == id) {
            //product found in cart increasing quantity
            if (quantity == 1) {
                console.log("inside if", parseInt(i.quantity))
                i.quantity += 1
            }
            else {
                console.log("inside else")
                i.quantity += quantity
            }
            return true
        }
    });
    return false
}
function addToCart(id) {
    var object = fetchProductsByProperties(products, "id", id)
    // product is not in cart so push it
    if (!fetchProductsByProperties(cart, "id", id).hasOwnProperty("id")) {
        object.quantity = 1
        cart.push(object)
        renderCart()
    }
    else {
        //product is already present just increase its quantity
        increaseQuantityById(cart, id)
        renderCart()
    }
    console.log(cart)
}
//binding events
$(".add-to-cart").click(function () {
    var id = $(this).attr("data")
    console.log(fetchProductsByProperties(products, "id", id))
    addToCart(id)

})