import { controller } from "./controller.js";

export function init() {
  const landingList = document.getElementById("landingQueueList");
  const takeoffList = document.getElementById("takeoffQueueList");
  const refreshBtn = document.getElementById("refreshQueues");

  const renderQueues = () => {
    landingList.innerHTML = "";
    takeoffList.innerHTML = "";

    let node = controller.landingQueue.front;
    while (node) {
      landingList.innerHTML += `<li class="list-group-item">${node.value.id} (${node.value.type}) - ${node.value.fuel}%</li>`;
      node = node.next;
    }

    node = controller.takeoffQueue.front;
    while (node) {
      takeoffList.innerHTML += `<li class="list-group-item">${node.value.id} (${node.value.type}) - ${node.value.fuel}%</li>`;
      node = node.next;
    }
  };

  refreshBtn.addEventListener("click", renderQueues);
  renderQueues();
}

