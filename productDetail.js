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
// console.log(pass);

function load_content(pass) {
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);

      var item = data.find((item) => item.id === pass);
      // console.log(item);
      // console.log("Loading content for {" + pass + "}");

      var output = `
                <div class="row">
                <div class="col-sm details-left  pImgGallery">
                    <div class="wrapper">
                        <div id="big_img">
                            <img src="${item.img}" width="292 " height="440" id="myPicture"
                                class="border" />
                        </div>
                        <div class="thumbnail-inner">
                            <img class="changeImg" src="${item.img}" id="small-1" />
                            <img class="changeImg" src="${item.img1}" id="small-2" />
                            <img class="changeImg" src="${item.img2}" id="small-3" />
                        </div>
                    </div>
                </div>
                <div class="col-sm details-right">
                    <div class="header row">
                        <span>${item.title}</span>
                        <p>${pass}</p>
                    </div>
                    <div class="price row">
                        <span>&#8378;${item.price}</span>
                        <p>KARGO BEDAVA</p>
                    </div>
                    <div class="sizes row">
                        <p>Beden</p>
                        <div class="sizeWrapper">
                            <p>34</p>
                            <p>36</p>
                            <p>39</p>

                        </div>
                    </div>
                    <div class="btn row">
                        <button id="${pass}" onclick="cartNumbers(this), show()" >Sepete Ekle</button>
                    </div>
                    <div class="detail row">
                        <span>Ürün Detayı</span>
                        <p> ${item.detail}</p>

                    </div>
                </div>
            </div>
                                `;
      document.querySelector("#productDetail").innerHTML = output;
    });
}

load_content(pass);

//   ÖNEMLİ NOT  // gallery fonksiyonunun load_content fonksiyonu bittikten sonra çalışması lazım
setTimeout(() => {
  gallery();
}, 2000);
// window.onload = gallery;
//when we load your gallery in browser then gallery function is loaded
function gallery() {
  // gallery is the name of function

  var allimages = document.images;
  // console.log(allimages);
  //now we create a variable allimages
  //and we store all images in this allimages variable
  for (var i = 0; i < allimages.length; i++) {
    //now we create a for loop
    if (allimages[i].id.indexOf("small") > -1) {
      allimages[i].onclick = imgChanger;
      //in above line we are adding a listener to all the thumbs stored inside the allimages array on onclick event.
    }
  }
}
//declaring the imgChanger function
function imgChanger() {
  var img = this;
  var mySrc = img.src;
  document.getElementById("myPicture").src = mySrc;
}

//önerilen kısmı hold to scroll
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
    // console.log(walk);
  });
}

var storageProducts = [
  {
    title: "",
    kind: "",
    img: "",
    price: "",
    inCart: 0,
  },
];
setTimeout(() => {
  window.scrollTo(0, 0);
}, 500);
