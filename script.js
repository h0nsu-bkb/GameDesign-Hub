const loopDescriptions = {
  1: "Игрок исследует зону, находит ресурсы и открывает рискованные маршруты для лута.",
  2: "Игрок тратит найденные ресурсы в бою, тестирует билд и принимает тактические решения.",
  3: "Игрок улучшает способности и снаряжение, после чего возвращается в более сложную зону."
};

const buttons = document.querySelectorAll(".loop-btn");
const info = document.getElementById("loop-info");

if (buttons.length && info) {
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
      info.textContent = loopDescriptions[btn.dataset.step];
    });
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const gameCards = document.querySelectorAll("#games-grid .game-card");

if (filterButtons.length && gameCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const genre = button.dataset.genre;
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      gameCards.forEach((card) => {
        const shouldShow = genre === "all" || card.dataset.genre === genre;
        card.style.display = shouldShow ? "block" : "none";
      });
    });
  });
}

const STORAGE_KEY = "gdh-theme";
const themeSelect = document.querySelector(".theme-select");
const rootElement = document.documentElement;

function applyTheme(theme) {
  if (theme === "red") {
    rootElement.removeAttribute("data-theme");
  } else {
    rootElement.setAttribute("data-theme", theme);
  }
}

if (themeSelect) {
  const savedTheme = localStorage.getItem(STORAGE_KEY) || "red";
  applyTheme(savedTheme);
  themeSelect.value = savedTheme;

  themeSelect.addEventListener("change", () => {
    const newTheme = themeSelect.value;
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  });
}
