// Lógica del flujo (control de colas, asignación, undo, etc.)

import { LinkedQueue, Stack, Flight } from "./structures.js";

// Controlador central: expone las colas y la pila de historial y acciones sobre vuelos
export const controller = {
  // Cola de aterrizaje (entrada)
  landingQueue: new LinkedQueue(),
  // Cola de despegue (salida)
  takeoffQueue: new LinkedQueue(),
  // Pila que guarda el historial de operaciones (LIFO) para permitir 'undo'
  history: new Stack(),

  // addFlight: crea un objeto Flight y lo encola según la operación o el tipo
  // - id: identificador del vuelo
  // - type: prioridad/tipo (Emergencia, Combustible, VIP, Carga, Comercial)
  // - fuel: porcentaje de combustible
  // - operation: opción explícita Aterrizaje/Despegue (opcional)
  addFlight(id, type, fuel, operation) {
    const flight = new Flight(id, type, fuel, operation);
    // Si se especifica operación, usarla; si no, fallback a la lógica por tipo
    if (operation === "Aterrizaje") {
      // Encola en la cola de aterrizaje
      this.landingQueue.enqueue(flight);
    } else if (operation === "Despegue") {
      // Encola en la cola de despegue
      this.takeoffQueue.enqueue(flight);
    } else {
      // Si no se especifica operación, decidir por tipo: emergencias y combustible van a aterrizaje
      if (type === "Emergencia" || type === "Combustible")
        this.landingQueue.enqueue(flight);
      else
        this.takeoffQueue.enqueue(flight);
    }

    // Guardar la creación/operación en el historial (pila) para poder deshacer
    this.history.push(flight);
    // Registro en consola (temporal) — idealmente usar controller.log para la consola de eventos
    console.log("Vuelo agregado:", flight);
  }
};
