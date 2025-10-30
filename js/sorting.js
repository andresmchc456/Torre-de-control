import { controller } from "./controller.js";
import { sortingAlgorithms } from "./sortingAlgorithms.js";

export function init() {
  const form = document.getElementById("sortForm");
  const output = document.getElementById("sortOutput");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const queueType = document.getElementById("queueSelect").value;
    const algorithm = document.getElementById("algorithmSelect").value;

    const queue = queueType === "landing" ? controller.landingQueue : controller.takeoffQueue;
    const flights = [];

    let current = queue.front;
    while (current) {
      flights.push(current.value);
      current = current.next;
    }

    output.innerHTML = `<p>🔍 Iniciando ordenamiento con ${algorithm.toUpperCase()}...</p>`;
    const sorted = sortingAlgorithms[algorithm](flights, output);

    // Reemplazar cola con resultado
    queue.front = queue.rear = null;
    sorted.forEach(f => queue.enqueue(f));

    output.innerHTML += `<p>✅ Orden completado.</p>`;
  });
}
