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
(function () {
  var delay = false;

  $(document).on("mousewheel DOMMouseScroll", function (event) {
    event.preventDefault();
    if (delay) return;

    delay = true;
    setTimeout(function () {
      delay = false;
    }, 200);

    var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;

    var a = document.getElementsByTagName("section");
    if (wd < 0) {
      for (var i = 0; i < a.length; i++) {
        var t = a[i].getClientRects()[0].top;
        if (t >= 40) break;
      }
    } else {
      for (var i = a.length - 1; i >= 0; i--) {
        var t = a[i].getClientRects()[0].top;
        if (t < -20) break;
      }
    }

    if (i >= 0 && i < a.length) {
      $("html,body").animate({
        scrollTop: a[i].offsetTop,
      });
    }
  });
})();
console.clear();
//auto scroll to section
