function renderProducts() {
    var markup
    products.forEach(i => {
        console.log(i)
        markup += `<div id="product-${i.id}" class="product">
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