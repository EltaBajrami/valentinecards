document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("top-right")
    .addEventListener("mouseenter", function () {
      document.getElementById("white").style.display = "block";
    });

  document
    .getElementById("top-right")
    .addEventListener("mouseout", function () {
      document.getElementById("white").style.display = "none";
    });

  document
    .getElementById("bottom-left")
    .addEventListener("mouseenter", function () {
      document.getElementById("milk").style.display = "block";
    });

  document
    .getElementById("bottom-left")
    .addEventListener("mouseout", function () {
      document.getElementById("milk").style.display = "none";
    });

  document
    .getElementById("bottom-right")
    .addEventListener("mouseenter", function () {
      document.getElementById("truffle").style.display = "block";
    });

  document
    .getElementById("bottom-right")
    .addEventListener("mouseout", function () {
      document.getElementById("truffle").style.display = "none";
    });

  document
    .getElementById("top-left")
    .addEventListener("mouseenter", function () {
      document.getElementById("truffle2").style.display = "block";
    });

  document.getElementById("top-left").addEventListener("mouseout", function () {
    document.getElementById("truffle2").style.display = "none";
  });
});
