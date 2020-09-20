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
      console.clear();
    } else {
      console.clear();
    }
  });
})();
console.clear();
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
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */
  window.scrollTo(0, 0);
  return FadeTransition;
};
//BARBA

//slider-arrow-deneme
const slider = document.querySelector(".sliderContents");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});
//slider-arrow-deneme
