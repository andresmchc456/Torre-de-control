import { controller } from "./controller.js";

// Inicializador del módulo de historial (pila)
export function init() {
  const list = document.getElementById("historyList");
  const undoBtn = document.getElementById("undoBtn");

  // Renderiza la pila de historial (mostrando del más reciente al más antiguo)
  const renderHistory = () => {
    list.innerHTML = "";
    // controller.history.items es un array; invertimos para mostrar LIFO
    controller.history.items.slice().reverse().forEach(item => {
      const op = item.operation ? ` - ${item.operation}` : "";
      list.innerHTML += `<li>${item.id} - ${item.type} - ${item.fuel}%${op}</li>`;
    });
  };

  // Deshacer la última asignación: pop de la pila y re-enqueue según reglas
  undoBtn.addEventListener("click", () => {
    const undone = controller.history.pop();
    if (undone) {
      // Usar operación explícita si existe; si no, fallback por tipo
      if (undone.operation === "Aterrizaje" || undone.type === "Emergencia" || undone.type === "Combustible") {
        // Reencolar en la cola de aterrizaje
        controller.landingQueue.enqueue(undone);
      } else if (undone.operation === "Despegue" || !undone.operation) {
        // Si tiene operación "Despegue" o no tiene operación y no es prioridad de aterrizaje
        if (undone.operation === "Despegue" || (undone.type !== "Emergencia" && undone.type !== "Combustible"))
          controller.takeoffQueue.enqueue(undone);
        else
          controller.landingQueue.enqueue(undone);
      }

      // Feedback al usuario y re-render del historial
      alert(`Operación deshecha: vuelo ${undone.id} retornado a su cola.`);
      renderHistory();
    } else {
      alert("No hay operaciones para deshacer.");
    }
  });

  renderHistory();
}
