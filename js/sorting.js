import { controller } from "./controller.js";
import { sortingAlgorithms } from "./sortingAlgorithms.js";

// Inicializador de la vista 'Ordenar'
export function init() {
  const form = document.getElementById("sortForm");
  const output = document.getElementById("sortOutput");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const queueType = document.getElementById("queueSelect").value;
    const algorithm = document.getElementById("algorithmSelect").value;

    // Obtener la cola seleccionada (landing o takeoff)
    const queue = queueType === "landing" ? controller.landingQueue : controller.takeoffQueue;
    const flights = [];

    // Convertir la cola enlazada en un array para pasar al algoritmo
    let current = queue.front;
    while (current) {
      flights.push(current.value);
      current = current.next;
    }

    // Limpiar/mostrar mensaje inicial en el panel de salida
    output.innerHTML = `<p>🔍 Iniciando ordenamiento con ${algorithm.toUpperCase()}...</p>`;
    // Ejecutar el algoritmo seleccionado. Los algoritmos usan controller.log para emitir pasos.
    const sorted = sortingAlgorithms[algorithm](flights, output);

    // Reemplazar la cola enlazada con el resultado ordenado (vaciar y encolar de nuevo)
    queue.front = queue.rear = null;
    sorted.forEach(f => queue.enqueue(f));

    output.innerHTML += `<p>✅ Orden completado.</p>`;
  });
}
