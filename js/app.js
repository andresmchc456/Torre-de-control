// Control principal (carga de componentes)

import { navigateTo } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("[data-view]");
  navigateTo("flight-form"); // Vista inicial

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const view = link.getAttribute("data-view");
      navigateTo(view);
      document.querySelector(".navbar-collapse").classList.remove("show");
    });
  });
});
