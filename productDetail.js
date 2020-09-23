function GetParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// document.getElementById("productDetail").innerHTML = GetParameterByName("pass");
var pass = GetParameterByName("pass");
console.log(pass);

function load_content(pass) {
  // global = this.id;
  // console.log("globale taşınan değer" + global);
  //değeri global değişkene taşıyıp sonra ordaki id ile veri çağırmak ?
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      //Id'ye göre veri çekme 1111111111111111
      // var item = findId(data, 1);
      console.log(data);
      //Id'ye göre veri çekme 222222222222222222222
      var item = data.find((item) => item.id === pass);
      console.log(item);
      console.log("Loading content for {" + pass + "}");

      var output = `
                                <div style="padding-top:100px;" class="alperen" > 
                                    <p> sonunda çalıştı </p>
                                    <h4> ID: ${pass} ${item.title}   </h4>
                                    <h5> fiyat: ${item.price}
                                    <img src="${item.img}">
                                </div>
                                `;
      document.querySelector("#productDetail").innerHTML = output;
    });
}
load_content(pass);
