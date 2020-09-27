const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

search.addEventListener("input", () => searchStates(search.value));

//searching and filterin json
const searchStates = async (searchText) => {
  const res = await fetch("/products.json");
  const states = await res.json();

  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.title.match(regex) || state.kind.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

//show result in html

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
          <a href="/productDetail.html?pass=${match.id}"> <div class="matched"  style="position:border-box" class="card card-body mb-1"> 
          <img height=60px src="${match.img}">
            <h4> ${match.title}</h4>
           <small> Fiyat: <strong> &#8378;${match.price} </strong> </small>
            </div>
            </a>
            `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

document.addEventListener("scroll", function () {
  if (scrollY >= 400) {
    document.getElementById("search").value = "";
    matchList.innerHTML = "";
  } else {
    return;
  }
});
