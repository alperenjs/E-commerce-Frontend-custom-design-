//vitrine tüm veriyi yazdırma

var dataShow = document.getElementById("productVitrin");

function getUsers() {
  // console.log(this.id);
  // global = this.id;
  // console.log("globale taşınan değer" + global);
  //değeri global değişkene taşıyıp sonra ordaki id ile veri çağırmak ?
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product) => {
        var output = `
            <div onclick="goTo(this)" id="${
              product.id
            }" class="card" style="width: 15rem;">
             <img class="card-img-top" src="${
               product.img
             }" alt="Card image cap">
             <div class="card-body">
                 <p class="card-text">${product.title.toUpperCase()}</p>
                 <p class="card-text price">&#8378; ${product.price} </p>
             </div>
         </div>`;

        dataShow.innerHTML += output;
      });
    });
}
//filter for kategori
function kategori() {
  let ktgrFilter = event.target.id;
  //secilen kategoriyi style ediyor
  let lists = document.querySelectorAll(".fa-square");
  lists.forEach((node) => {
    node.classList.remove("fas");
  });
  event.currentTarget.childNodes[0].classList.add("fas");
  //secilen kategoriyi style ediyor
  window.scrollTo(0, 0);
  dataShow.innerHTML = "";
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      var result = data.filter((items) => items.kind == ktgrFilter);
      result.forEach((product) => {
        var output = `
            <div onclick="goTo(this)" id="${
              product.id
            }" class="card" style="width: 15rem;">
             <img class="card-img-top" src="${
               product.img
             }" alt="Card image cap">
             <div class="card-body">
                 <p class="card-text">${product.title.toUpperCase()}</p>
                 <p class="card-text price">&#8378; ${product.price} </p>
             </div>
         </div>`;

        dataShow.innerHTML += output;
      });
    });
}

//filter for fiyat
function filterPrice() {
  let ktgrFilter = event.target.id;
  let param1 = event.target.getAttribute("data-first");
  let param2 = event.target.getAttribute("data-second");
  console.log(param1, param2);
  //secilen kategoriyi style ediyor
  let lists = document.querySelectorAll(".fa-square");
  lists.forEach((node) => {
    node.classList.remove("fas");
  });
  event.currentTarget.childNodes[0].classList.add("fas");
  //secilen kategoriyi style ediyor
  dataShow.innerHTML = "";
  window.scrollTo(0, 0);
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      var result = data.filter(
        (items) => items.price >= param1 && items.price <= param2
      );
      result.forEach((product) => {
        var output = `
            <div onclick="goTo(this)" id="${
              product.id
            }" class="card" style="width: 15rem;">
             <img class="card-img-top" src="${
               product.img
             }" alt="Card image cap">
             <div class="card-body">
                 <p class="card-text">${product.title.toUpperCase()}</p>
                 <p class="card-text price">&#8378; ${product.price} </p>
             </div>
         </div>`;

        dataShow.innerHTML += output;
      });
    });
}

//filter for beden
function filterSize() {
  let ktgrFilter = event.target.id;
  //secilen kategoriyi style ediyor
  let lists = document.querySelectorAll(".fa-square");
  lists.forEach((node) => {
    node.classList.remove("fas");
  });
  event.currentTarget.childNodes[0].classList.add("fas");
  //secilen kategoriyi style ediyor
  window.scrollTo(0, 0);
}

//azalan artan sıralama
function sort() {
  var x = document.getElementById("sortSelect").value;

  dataShow.innerHTML = "";
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      if (x == 2) {
        console.log("evet x 2");
        data.sort(function (vote1, vote2) {
          if (vote1.price > vote2.price) return -1;
          if (vote1.price < vote2.price) return 1;
        });
      } else {
        console.log("evet x 1");
        data.sort(function (vote1, vote2) {
          if (vote1.price < vote2.price) return -1;
          if (vote1.price > vote2.price) return 1;
        });
      }
      data.forEach((product) => {
        var sortedOutput = `
        <div onclick="goTo(this)" id="${
          product.id
        }" class="card" style="width: 15rem;">
         <img class="card-img-top" src="${product.img}" alt="Card image cap">
         <div class="card-body">
             <p class="card-text">${product.title.toUpperCase()}</p>
             <p class="card-text price">&#8378; ${product.price} </p>
         </div>
     </div>`;

        console.log(product.price);
        dataShow.innerHTML += sortedOutput;
      });
    });
}
//azalan artan sıralama

getUsers();

function goTo(e) {
  pass = e.id;
  // ad = document.getElementById('kullaniciadi').value;
  // console.log(pass);
  window.location.href = "productDetail.html?pass=" + pass;
}

function openNav() {
  document.getElementById("filterBar").style.width = "200px";
  document.getElementById("shopSection").style.marginLeft = "200px";
}

function closeNav() {
  document.getElementById("filterBar").style.width = "0";
  document.getElementById("shopSection").style.marginLeft = "0";
}
