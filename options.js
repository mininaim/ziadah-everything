function toggleOptions(button) {
  const item = button.closest(".item");
  const dropdown = item.querySelector(".options-dropdown");
  const chevron = button.querySelector("i");

  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "flex";
    chevron.classList.remove("bi-chevron-down");
    chevron.classList.add("bi-chevron-up");
  } else {
    dropdown.style.display = "none";
    chevron.classList.remove("bi-chevron-up");
    chevron.classList.add("bi-chevron-down");
  }
}

function closeOptions(button) {
  const item = button.closest(".item");
  const dropdown = item.querySelector(".options-dropdown");
  const optionsButton = item.querySelector(".continue-shopping");
  const chevron = optionsButton.querySelector("i");

  dropdown.style.display = "none";
  chevron.classList.remove("bi-chevron-up");
  chevron.classList.add("bi-chevron-down");
}
