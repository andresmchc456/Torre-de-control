import { controller } from "./controller.js";

export function init() {
  const form = document.getElementById("flightForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const id = document.getElementById("flightId").value;
    const type = document.getElementById("flightType").value;
    const fuel = parseInt(document.getElementById("fuel").value);
    const operation = document.getElementById("operation").value; // <-- nuevo
    controller.addFlight(id, type, fuel, operation); // <-- pasar operation
    const toast = new bootstrap.Toast(document.getElementById("liveToast"));
    alert(`✅ Vuelo ${id} agregado con tipo ${type}`);
    form.reset();
  });
}
