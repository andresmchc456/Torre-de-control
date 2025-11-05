// Lógica del flujo (control de colas, asignación, undo, etc.)

import { LinkedQueue, Stack, Flight } from "./structures.js";

export const controller = {
  landingQueue: new LinkedQueue(),
  takeoffQueue: new LinkedQueue(),
  history: new Stack(),

  addFlight(id, type, fuel, operation) {
    const flight = new Flight(id, type, fuel, operation);
    // Si se especifica operación, usarla; si no, fallback a la lógica por tipo
    if (operation === "Aterrizaje") {
      this.landingQueue.enqueue(flight);
    } else if (operation === "Despegue") {
      this.takeoffQueue.enqueue(flight);
    } else {
      // Lógica existente por tipo
      if (type === "Emergencia" || type === "Combustible")
        this.landingQueue.enqueue(flight);
      else
        this.takeoffQueue.enqueue(flight);
    }

    this.history.push(flight);
    console.log("Vuelo agregado:", flight);
  }
};
