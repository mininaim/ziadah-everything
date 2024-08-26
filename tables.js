function showToast(message, duration = 3000) {
  let toastContainer = document.querySelector(".ziadah-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "ziadah-toast-container";
    toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
        `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "ziadah-toast";
  toast.textContent = message;
  toast.style.cssText = `
        background-color: #333;
        color: #fff;
        padding: 12px 20px;
        border-radius: 4px;
        margin-top: 10px;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        max-width: 300px;
    `;

  toastContainer.appendChild(toast);

  // Trigger reflow to make the opacity transition work
  toast.offsetHeight;
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toastContainer.removeChild(toast);
      if (toastContainer.children.length === 0) {
        document.body.removeChild(toastContainer);
      }
    }, 300); // Fade out duration
  }, duration);
}

function copyCouponCode() {
  const couponCode = document.getElementById("couponCode").textContent.trim();
  navigator.clipboard.writeText(couponCode).then(() => {
    const copyIcon = document.getElementById("copyIcon");
    const couponContainer = document.getElementById("couponContainer");

    // Change icon to check mark and make it white
    copyIcon.classList.remove("bi-clipboard", "text-dark");
    copyIcon.classList.add("bi-check-circle-fill", "text-white");

    // Change background color to green and text to white
    couponContainer.classList.remove("bg-dark", "bg-opacity-10", "text-dark");
    couponContainer.classList.add("bg-success", "text-white");

    // Change text to "Code copied"
    copyIcon.nextElementSibling.textContent = "تم نسخ الكود";

    // Reset after 3 seconds
    setTimeout(() => {
      copyIcon.classList.remove("bi-check-circle-fill", "text-white");
      copyIcon.classList.add("bi-clipboard", "text-dark");
      couponContainer.classList.remove("bg-success", "text-white");
      couponContainer.classList.add("bg-dark", "bg-opacity-10", "text-dark");
      copyIcon.nextElementSibling.textContent = couponCode;
    }, 3000);
  });
}

// Backdrop opacity control
const modal = document.getElementById("modalDesktopCrossOneProductCouponPopup");
const opacityControl = document.querySelector(".opacity-control");
const opacitySlider = document.getElementById("backdropOpacity");

modal.addEventListener("show.bs.modal", function () {
  opacityControl.style.display = "block";
  updateBackdropOpacity();
});

modal.addEventListener("hidden.bs.modal", function () {
  opacityControl.style.display = "none";
});

opacitySlider.addEventListener("input", updateBackdropOpacity);

function updateBackdropOpacity() {
  const opacity = opacitySlider.value;
  document.querySelector(".modal-backdrop").style.opacity = opacity;
}

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

const modalDialog = modal.querySelector(".modal-dialog");
const dragArea = modal.querySelector(".modal-drag-area");

dragArea.addEventListener("mousedown", dragStart, false);
document.addEventListener("mouseup", dragEnd, false);
document.addEventListener("mousemove", drag, false);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;
  isDragging = true;
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;
  isDragging = false;
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    xOffset = currentX;
    yOffset = currentY;
    setTranslate(currentX, currentY, modalDialog);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

// Reset modal position when it's hidden
modal.addEventListener("hidden.bs.modal", function () {
  modalDialog.style.transform = "none";
  xOffset = 0;
  yOffset = 0;
});
