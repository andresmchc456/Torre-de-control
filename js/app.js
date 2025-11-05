// Control principal (carga de componentes)
// Este archivo inicializa la aplicación en el cliente y configura el router.
import { navigateTo } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  // Selecciona los enlaces del navbar que indican vistas mediante data-view
  const links = document.querySelectorAll("[data-view]");

  // Cargar la vista por defecto al iniciar la app
  navigateTo("flight-form"); // Vista inicial

  // Añade listener a cada enlace para navegar sin recargar la página
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const view = link.getAttribute("data-view");
      // navigateTo carga el HTML parcial y su módulo JS asociado
      navigateTo(view);
      // cerrar el menú responsive si está abierto
      document.querySelector(".navbar-collapse").classList.remove("show");
    });
  });
});
