"use strict";

var shareBlock;

function hideShareBlock() {
  shareBlock.style.transform = "translateY(100%) ";
  shareBlock.style.opacity = "0";
  shareBlock.style.transition = "transform 0.3s ease-in, opacity 0.2s ease-in";
  shareBlock.classList.remove("visible");
}

function showShareBlock() {
  shareBlock.style.transform = "translateY(-10%) ";
  shareBlock.style.opacity = "1";
  shareBlock.style.transition =
    "transform 0.3s ease-out, opacity 0.2s ease-out";
  shareBlock.classList.add("visible");
}

document.addEventListener("DOMContentLoaded", () => {
  shareBlock = document.querySelector(".share-block");
  document.querySelector("#share").addEventListener("click", function () {
    if (shareBlock.classList.contains("visible")) {
      hideShareBlock();
    } else {
      showShareBlock();
    }
  });
  interact(".share-block").draggable({
    onmove: function (event) {
      var target = shareBlock,
        // keep the dragged position in the data-x/data-y attributes
        y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translateY(" + y + "px)";

      // update the position attributes
      target.setAttribute("data-y", y);
    },
    onend: function (event) {
      var target = shareBlock;
      if (
        parseInt(target.getAttribute("data-y")) > 10 ||
        parseInt(target.getAttribute("data-y")) < -10
      ) {
        hideShareBlock();
      }
    },
  });
});
