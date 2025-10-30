import { controller } from "./controller.js";

export function init() {
  const list = document.getElementById("historyList");
  const undoBtn = document.getElementById("undoBtn");

  const renderHistory = () => {
    list.innerHTML = "";
    controller.history.items.slice().reverse().forEach(item => {
      list.innerHTML += `<li>${item.id} - ${item.type} - ${item.fuel}%</li>`;
    });
  };

  undoBtn.addEventListener("click", () => {
    const undone = controller.history.pop();
    if (undone) {
      if (undone.type === "Emergencia" || undone.type === "Combustible")
        controller.landingQueue.enqueue(undone);
      else
        controller.takeoffQueue.enqueue(undone);

      alert(`Operación deshecha: vuelo ${undone.id} retornado a su cola.`);
      renderHistory();
    } else {
      alert("No hay operaciones para deshacer.");
    }
  });

  renderHistory();
}
