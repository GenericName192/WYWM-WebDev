$(".home").ready(function () {
  $(".content").load("./resources/pages/home.html", () => {
    $("#headerHome")
      .removeClass()
      .addClass("nav-link active text-black fw-bold");
  });
});

$(".home").click(function () {
  $(".content").load("./resources/pages/home.html", () => {
    $("#headerHome")
      .removeClass()
      .addClass("nav-link active text-black fw-bold");
  });
});

$(".shop").click(function () {
  $(".content").load("./resources/pages/shop.html", () => {
    $("#headerShop")
      .removeClass()
      .addClass("nav-link active text-black fw-bold");
  });
});

$(".about").click(function () {
  $(".content").load("./resources/pages/about.html", () => {
    $("#headerAboutUs")
      .removeClass()
      .addClass("nav-link active text-black fw-bold");
  });
});
