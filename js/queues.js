import { controller } from "./controller.js";

// Inicializador de la vista que muestra las colas de aterrizaje y despegue
export function init() {
  const landingList = document.getElementById("landingQueueList");
  const takeoffList = document.getElementById("takeoffQueueList");
  const refreshBtn = document.getElementById("refreshQueues");

  // Renderiza el contenido de las dos colas en la UI
  const renderQueues = () => {
    landingList.innerHTML = "";
    takeoffList.innerHTML = "";

    // Recorrer la cola de aterrizaje desde front hasta rear
    let node = controller.landingQueue.front;
    while (node) {
      const op = node.value.operation ? ` - ${node.value.operation}` : "";
      landingList.innerHTML += `<li class="list-group-item">${node.value.id} (${node.value.type}) - ${node.value.fuel}%${op}</li>`;
      node = node.next;
    }

    // Recorrer la cola de despegue
    node = controller.takeoffQueue.front;
    while (node) {
      const op = node.value.operation ? ` - ${node.value.operation}` : "";
      takeoffList.innerHTML += `<li class="list-group-item">${node.value.id} (${node.value.type}) - ${node.value.fuel}%${op}</li>`;
      node = node.next;
    }
  };

  // Botón para refrescar la vista manualmente
  refreshBtn.addEventListener("click", renderQueues);
  // Render inicial
  renderQueues();
}

