function GetParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var pass = GetParameterByName("pass");
console.log(pass);

function load_content(pass) {
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      //Id'ye göre veri çekme

      //aşağı satır filter 'shoe' kind içerenleri çekiyor
      //   let newData = [];
      //   let filterValue = "shoe";

      //   for (let value in data) {
      //     if (data[value].kind === filterValue) {
      //.price >= fiyat diyip fiyat da kategoriliyebiliyoruz
      //       newData.push(data[value]);
      //     }
      //   }
      //   console.log(newData);
      //aynı kind ürünleir yukarda çekip bu foreach ile sayafaya yazdırcaz
      //   newData.forEach((urun) => {
      //     console.log(urun);
      //   });
      //

      var item = data.find((item) => item.id === pass);
      console.log(item);
      console.log("Loading content for {" + pass + "}");

      var output = `
                                <div style="padding-top:100px;" class="alperen" > 
                                    <p> sonunda çalıştı </p>
                                    <h4> ID: ${pass} ${item.title}   </h4>
                                    <h5> fiyat: ${item.price}
                                    <p> ${item.detail} </p>
                                    <img src="${item.img}">
                                </div>
                                `;
      document.querySelector("#productDetail").innerHTML = output;
    });
}

load_content(pass);
