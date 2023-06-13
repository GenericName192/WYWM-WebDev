// if the user clicks one of the goblin cards
$(".add-item").click(function () {
  let products = [];
  const myToast = new bootstrap.Toast(".toast");
  myToast.show();
  if (localStorage.getItem("items")) {
    products = JSON.parse(localStorage.getItem("items"));
  }

  const itemElement = $(this).parent().find(".card-text").text();
  const itemName = itemElement.split("$")[0];
  const itemPrice = itemElement.split("$")[1];
  const itemId = $(this).parent().find(".card-text").attr("data-id");

  let itemExists = false;
  products.forEach((product) => {
    if (product.name === itemName) {
      itemExists = true;
      product.quantity += 1;
    }
  });

  if (!itemExists) {
    products.push({
      name: itemName,
      price: itemPrice,
      quantity: 1,
      id: itemId,
    });
  }

  localStorage.setItem("items", JSON.stringify(products));

  $("#shoppingCart").load("./resources/pages/shoppingCart.html", () => {
    $(".numberOfItems").text(products.length);
  });
});
