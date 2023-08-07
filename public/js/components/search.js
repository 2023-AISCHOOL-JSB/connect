const searchBtn = document.querySelector(".search__button");
const searchInput = document.querySelector(".search__input");

searchBtn.addEventListener("click", () => {
  searchInput.classList.toggle("search__show");
});