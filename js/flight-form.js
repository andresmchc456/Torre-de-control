import { controller } from "./controller.js";

// Inicializador del formulario para crear vuelos
export function init() {
  const form = document.getElementById("flightForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    // Leer campos del formulario
    const id = document.getElementById("flightId").value;
    const type = document.getElementById("flightType").value;
    const fuel = parseInt(document.getElementById("fuel").value);
    const operation = document.getElementById("operation").value; // <-- nuevo
    // Llamar al controlador central para crear y encolar el vuelo
    controller.addFlight(id, type, fuel, operation); // <-- pasar operation
    // Notificación simple al usuario (puede usarse un toast en vez de alert)
    const toast = new bootstrap.Toast(document.getElementById("liveToast"));
    alert(`✅ Vuelo ${id} agregado con tipo ${type}`);
    // Resetear el formulario después de enviar
    form.reset();
  });
}
