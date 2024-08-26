function updateButtonState() {
  var quantity = parseInt(document.getElementById("quantity").value);
  var decrementBtn = document.getElementById("decrementBtn");
  decrementBtn.disabled = quantity <= 1;
}

function incrementQuantity() {
  var input = document.getElementById("quantity");
  input.value = parseInt(input.value) + 1;
  updateButtonState();
}

function decrementQuantity() {
  var input = document.getElementById("quantity");
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
  updateButtonState();
}

document.addEventListener("DOMContentLoaded", function () {
  var modalElement = document.getElementById(
    "modalDesktopCrossOneProductCouponPopup"
  );
  modalElement.addEventListener("shown.bs.modal", function () {
    updateButtonState();
  });

  updateButtonState();
});
