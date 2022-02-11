// variables
var cart = []
// function and definitions
function renderCart() {
    // clearing out the existing table
    $("#cart").empty()
    var markup = `
    ${cart.length > 0 ? `<button class="emptyCart">Empty Cart</button>` : ``}
        <table>
            <thead>
            <tr>
                <td>id</td>
                <td>image</td>
                <td>name</td>
                <td>price</td>
                <td>quantity</td>
                <td>Total</td>
                <td>remove</td>
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
            <td>
            <span>${i.quantity} <a href="#" data="${i.id}" id="editQuantity">edit</a></span>
            <input type="number" style="display:none;">
            <button style="display:none;" id="addQuantity">Add</button>
            </td>
            <td>${i.price * i.quantity}</td>
            <td><a href="#" data=${i.id} id="delete">X</a></td>
        </tr>
        </tbody>
        `
    })
    markup += `</table>
    ${cart.length > 0 ? `<h2 style="margin:10px">Total ${getTotal()}$</h2>` : ``}`
    $("#cart").append(markup)
}
function getTotal() {
    var total = 0
    cart.forEach(i => {
        total += i.quantity * i.price
    })
    return total
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
function removeProductFromCartById(id) {
    let index = 0
    cart.forEach(i => {
        if (i.id == id) {
            cart.splice(index, 1)
            renderCart()
            return true
        }
        index++
    })
    return false
}
//binding events
$(".add-to-cart").click(function (e) {
    e.preventDefault()
    var id = $(this).attr("data")
    console.log(fetchProductsByProperties(products, "id", id))
    addToCart(id)

})

$("body").on("click", "#editQuantity", function (e) {
    e.preventDefault()
    // alert($(this).parent().text())
    $(this).parent().css("display", "none")
    $(this).parent().next().css("display", "")
    $(this).parent().next().next().css("display", "")
})

// binding events on add quantity button
$("body").on("click", "#addQuantity", function () {
    var id = $(this).prev().prev().children().attr("data")
    var quantity = parseInt($(this).prev().val())
    if (!isNaN(quantity)) {
        increaseQuantityById(cart, id, quantity)
        renderCart()
    }
    else {
        renderCart()
    }
})

// delete event
$("body").on("click", "#delete", function (e) {
    e.preventDefault()
    removeProductFromCartById(parseInt($(this).attr("data")))
})

//empty the cart
$("body").on("click", ".emptyCart", function () {
    cart = []
    $(this).remove()
    // alert($(this).text())
    renderCart()
})