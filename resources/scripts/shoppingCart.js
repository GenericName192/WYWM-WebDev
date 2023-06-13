$(document).ready(function () {
  itemNumber = 0;
  let product = [];
  if (localStorage.getItem("items")) {
    products = JSON.parse(localStorage.getItem("items"));
    itemNumber = products.length;
  }
  $(".numberOfItems").text(itemNumber);

  // when the user clicks the shopping cart button, update .modal-body with the items in the cart
  $(".buttonWrapper").click(function () {
    if (localStorage.getItem("items")) {
      products = JSON.parse(localStorage.getItem("items"));
      let totalCost = 0;
      let modalBody = $(".modal-body");
      modalBody.empty(); // empty the initial contents of modal body before adding new items

      // render products name, price, and quantity
      products.map((product) => {
        totalCost = parseInt(product.price * product.quantity) + totalCost;
        modalBody.append(
          `<div class="productWrapper" id="product_${product.id}">
          <img src="./resources/styles/pics/${
            product.name
          }.png" style="height: 4rem; width: 4rem;">
                <div id="productInfo"  class="col" style="margin-left: 100px">
                  <div class="name">${product.name} - $${
            product.price
          }/item</div>
                  <div class="quantity">x ${product.quantity}</div>
                  <div class="total-price">total price - $${
                    product.quantity * product.price
                  }</div>
                </div>
                <div id="actions">
                  <button class="btn btn-primary increaseQuantity" id="${
                    product.name
                  }">
                    +
                  </button>
                  <button class="btn btn-danger decreaseQuantity" id="${
                    product.name
                  }">
                    -
                  </button>
                                
              </div>
              `
        );
      });
      modalBody.append(
        `<div class="totalCost">total cost - $${totalCost}</div>`
      );

      $(".increaseQuantity").click(function () {
        // get the id attribute of the button
        let productName = $(this).attr("id");
        // match the productName to the selected item inside products array
        let product = products.find((product) => product.name === productName);
        // then increase the selected item quantity by 1
        product.quantity++;
        totalCost = parseInt(product.price) + totalCost;
        $(".totalCost").text(`total cost - $${totalCost}`);

        // update the quantity div's text - go up to productWrapper level, and then find the div with .quantity class
        $(this)
          .closest(".productWrapper") // get the closest productWrapper div
          .find(".quantity") // get the quantity div
          .text(`x ${product.quantity}`); // update the text of the quantity

        // update the items in localStorage
        localStorage.setItem("items", JSON.stringify(products));
      });

      $(".decreaseQuantity").click(function () {
        // get the id attribute of the button
        let productName = $(this).attr("id");
        // match the productName to the selected item inside products array
        let product = products.find((product) => product.name === productName);
        let productIndex = products.findIndex(
          (product) => product.name === productName
        );
        // then increase the selected item quantity by 1
        if (product.quantity > 1) {
          product.quantity--;
          totalCost = totalCost - parseInt(product.price);
          $(".totalCost").text(`total cost - $${totalCost}`);
        } else {
          console.log(product);
          products.splice(productIndex, 1);
          console.log(products);
          $("#product_" + product.id).remove();
          $(".numberOfItems").text(products.length);
          totalCost = totalCost - parseInt(product.price);
          $(".totalCost").text(`total cost - $${totalCost}`);
        }

        // update the quantity div's text - go up to productWrapper level, and then find the div with .quantity class
        $(this)
          .closest(".productWrapper") // get the closest productWrapper div
          .find(".quantity") // get the quantity div
          .text(`x ${product.quantity}`); // update the text of the quantity

        // update the items in localStorage
        localStorage.setItem("items", JSON.stringify(products));
      });
    }
  });
});
$(".close").click(function () {
  $(".modal").modal("hide");
});
