import { controller } from "./controller.js";

export function init() {
  const list = document.getElementById("historyList");
  const undoBtn = document.getElementById("undoBtn");

  const renderHistory = () => {
    list.innerHTML = "";
    controller.history.items.slice().reverse().forEach(item => {
      const op = item.operation ? ` - ${item.operation}` : "";
      list.innerHTML += `<li>${item.id} - ${item.type} - ${item.fuel}%${op}</li>`;
    });
  };

  undoBtn.addEventListener("click", () => {
    const undone = controller.history.pop();
    if (undone) {
      // Usar operación explícita si existe; si no, fallback por tipo
      if (undone.operation === "Aterrizaje" || undone.type === "Emergencia" || undone.type === "Combustible") {
        controller.landingQueue.enqueue(undone);
      } else if (undone.operation === "Despegue" || !undone.operation) {
        // Si tiene operación "Despegue" o no tiene operación y no es prioridad de aterrizaje
        if (undone.operation === "Despegue" || (undone.type !== "Emergencia" && undone.type !== "Combustible"))
          controller.takeoffQueue.enqueue(undone);
        else
          controller.landingQueue.enqueue(undone);
      }

      alert(`Operación deshecha: vuelo ${undone.id} retornado a su cola.`);
      renderHistory();
    } else {
      alert("No hay operaciones para deshacer.");
    }
  });

  renderHistory();
}
