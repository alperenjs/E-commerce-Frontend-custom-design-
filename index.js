//on toggle show menu collapsable div
var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function () {
    this.parentElement
      .querySelector(".dropdown-content")
      .classList.toggle("dropdownOnClick");

    this.classList.toggle("caret-down");
  });
}
//on toggle show menu collapsable div

//auto scroll to section
// (function () {
//   var delay = false;

//   $(document).on("mousewheel DOMMouseScroll", function (event) {
//     event.preventDefault();
//     if (delay) return;

//     delay = true;
//     setTimeout(function () {
//       delay = false;
//     }, 200);

//     var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;

//     var a = document.getElementsByTagName("section");
//     if (wd < 0) {
//       for (var i = 0; i < a.length; i++) {
//         var t = a[i].getClientRects()[0].top;
//         if (t >= 40) break;
//       }
//     } else {
//       for (var i = a.length - 1; i >= 0; i--) {
//         var t = a[i].getClientRects()[0].top;
//         if (t < -20) break;
//       }
//     }

//     if (i >= 0 && i < a.length) {
//       $("html,body").animate({
//         scrollTop: a[i].offsetTop,
//       });
//       console.clear();
//     } else {
//       console.clear();
//     }
//   });
// })();
// console.clear();
//auto scroll to section

//BARBA
Barba.Pjax.start();
var FadeTransition = Barba.BaseTransition.extend({
  start: function () {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise.all([this.newContainerLoading, this.fadeOut()]).then(
      this.fadeIn.bind(this)
    );
  },

  fadeOut: function () {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function () {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */
    var _this = this;
    var $el = $(this.newContainer);
    // location.reload(); // css'i yenilemek için

    $(this.oldContainer).hide();

    $el.css({
      visibility: "visible",
      opacity: 0,
    });

    $el.animate({ opacity: 1 }, 400, function () {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
      location.reload();
    });
  },
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */
Barba.Pjax.getTransition = function () {
  window.scrollTo(0, 0);
  return FadeTransition;
};
//
{
  const onerilen = document.querySelector(".onerilenWrapper");
  let isDown = false;
  let startX;
  let scrollLeft;

  onerilen.addEventListener("mousedown", (e) => {
    isDown = true;
    onerilen.classList.add("holding");
    startX = e.pageX - onerilen.offsetLeft;
    scrollLeft = onerilen.scrollLeft;
  });
  onerilen.addEventListener("mouseleave", () => {
    isDown = false;
    onerilen.classList.remove("holding");
  });
  onerilen.addEventListener("mouseup", () => {
    isDown = false;
    onerilen.classList.remove("holding");
  });
  onerilen.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - onerilen.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    onerilen.scrollLeft = scrollLeft - walk;
    console.log(walk);
  });
}

//sidebar deneme //

//shop CART

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".shopCartIcon span").textContent = productNumbers;
  }
}

function cartNumbers(item) {
  var access = item.id;
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);

      var adding = data.find((item) => item.id === access);
      setItems(adding);
    });
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".shopCartIcon span").textContent =
      productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".shopCartIcon span").textContent = 1;
  }
}

function setItems(adding) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[adding.id] == undefined) {
      cartItems = {
        ...cartItems,
        [adding.id]: adding,
      };
    }

    cartItems[adding.id].inCart += 1;
  } else {
    adding.inCart = 1;
    cartItems = {
      [adding.id]: adding,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  totalCost(adding);
}
function decreaseItems(adding) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems[adding.id].inCart > 0) {
    cartItems[adding.id].inCart -= 1;
  } else {
    return;
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseInt(cartCost);

  let urunfiyat = cartItems[adding.id].price;

  if (cartCost > 0) {
    localStorage.setItem("totalCost", cartCost - urunfiyat);
  } else {
    return;
  }

  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".shopCartIcon span").textContent =
      productNumbers - 1;
  } else {
    return;
  }
}

function totalCost(adding) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + adding.price);
  } else {
    localStorage.setItem("totalCost", adding.price);
  }
}

function displayCart() {
  window.scrollTo(0, 0);
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("totalCost");
  let productContainer = document.querySelector(".products");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `    <div class="row product">
      <div class="col">
          <img src="${item.img}" height="100px"> </div>

      <div class="col productName">${item.title}</div>
      <div class="col">
          <i id=${item.id} onclick="decreaseItems(this), reload()" class="fas fa-arrow-circle-left"></i> ${item.inCart} <i id="${item.id}" onclick="cartNumbers(this), reload()" class="fas fa-arrow-circle-right"></i>
      </div>
      <div class="col">	&#8378;${item.price}</div>
   
  </div> `;
    });
    productContainer.innerHTML += `
    <div class="totalCost">
    <div class="row">
        <span>Toplam</span>
        <span>	&#8378;${cartCost}</span>
    </div>
</div>
<div class="btn row">
    <button>Alışverişi Tamamla</button>
</div>
     `;
  }
}

function removeItems() {
  localStorage.clear();
  location.reload();
}

onLoadCartNumbers();
displayCart();

//shop CART

//
//
//
//
//
//toast
function show() {
  console.log("works");
  toast.create({
    title: "Ürün Başarıyla Eklendi",
    // text: "Some text",
  });
}

(function (root, factory) {
  try {
    // commonjs
    if (typeof exports === "object") {
      module.exports = factory();
      // global
    } else {
      root.toast = factory();
    }
  } catch (error) {
    console.log(
      "Isomorphic compatibility is not supported at this time for toast."
    );
  }
})(this, function () {
  // We need DOM to be ready
  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("DOMContentLoaded", init);
  }

  // Create toast object
  toast = {
    // In case toast creation is attempted before dom has finished loading!
    create: function () {
      console.error(
        [
          "DOM has not finished loading.",
          "\tInvoke create method when DOMs readyState is complete",
        ].join("\n")
      );
    },
  };
  var autoincrement = 0;

  // Initialize library
  function init() {
    // Toast container
    var container = document.createElement("div");
    container.id = "cooltoast-container";
    document.body.appendChild(container);

    // @Override
    // Replace create method when DOM has finished loading
    toast.create = function (options) {
      var toast = document.createElement("div");
      toast.id = ++autoincrement;
      toast.id = "toast-" + toast.id;
      toast.className = "cooltoast-toast";

      // title
      if (options.title) {
        var h4 = document.createElement("h4");
        h4.className = "cooltoast-title";
        h4.innerHTML = options.title;
        toast.appendChild(h4);
      }

      // text
      if (options.text) {
        var p = document.createElement("p");
        p.className = "cooltoast-text";
        p.innerHTML = options.text;
        toast.appendChild(p);
      }

      // icon
      if (options.icon) {
        var img = document.createElement("img");
        img.src = options.icon;
        img.className = "cooltoast-icon";
        toast.appendChild(img);
      }

      // click callback
      if (typeof options.callback === "function") {
        toast.addEventListener("click", options.callback);
      }

      // toast api
      toast.hide = function () {
        toast.className += " cooltoast-fadeOut";
        toast.addEventListener("animationend", removeToast, false);
      };

      // autohide
      if (options.timeout) {
        setTimeout(toast.hide, options.timeout);
      }
      // else setTimeout(toast.hide, 2000);

      if (options.type) {
        toast.className += " cooltoast-" + options.type;
      }

      toast.addEventListener("click", toast.hide);

      function removeToast() {
        document.getElementById("cooltoast-container").removeChild(toast);
      }

      document.getElementById("cooltoast-container").appendChild(toast);
      return toast;
    };
  }

  return toast;
});

function reload() {
  location.reload();
}

//nav link to shop
document.querySelectorAll(".shopLink").forEach((item) => {
  item.addEventListener("click", (event) => {
    window.location.href = "shop.html";
  });
});

document.getElementById("goToShop").addEventListener("click", (event) => {
  window.location.href = "shop.html";
});
