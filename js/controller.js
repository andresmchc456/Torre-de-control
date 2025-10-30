// Lógica del flujo (control de colas, asignación, undo, etc.)

import { LinkedQueue, Stack, Flight } from "./structures.js";

export const controller = {
  landingQueue: new LinkedQueue(),
  takeoffQueue: new LinkedQueue(),
  history: new Stack(),

  addFlight(id, type, fuel) {
    const flight = new Flight(id, type, fuel);
    if (type === "Emergencia" || type === "Combustible")
      this.landingQueue.enqueue(flight);
    else
      this.takeoffQueue.enqueue(flight);

    this.history.push(flight);
    console.log("Vuelo agregado:", flight);
  }
};
