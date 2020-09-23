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
                 <p class="card-text price"> ${product.price}&#8378; </p>
             </div>
         </div>`;

        dataShow.innerHTML += output;
      });
    });
}

getUsers();

function goTo(e) {
  pass = e.id;
  // ad = document.getElementById('kullaniciadi').value;
  //   console.log(pass);
  window.location.href = "productDetail.html?pass=" + pass;
}

//

//tıklanan ürünün detay sayfasını açma

// document
//   .getElementsByClassName("card")
//   .addEventListener("click", AdminButtonClick);
// function AdminButtonClick() {
//   ad = event.target.id;
//   // ad = document.getElementById('kullaniciadi').value;
//   console.log(ad);
//   window.location.href = "data2.html?ad=" + ad;
// }
