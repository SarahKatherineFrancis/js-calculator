function buttonClick(value) {
  console.log(value);
}

function init() {
  document
    .querySelector(".cal-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
