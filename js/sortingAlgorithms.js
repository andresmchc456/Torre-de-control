import { controller } from "./controller.js"; // nuevo: usar logger central

export const sortingAlgorithms = {
  bubble(list) {
    const arr = [...list];
    const log = (msg) => (controller.log ? controller.log(msg) : console.log(msg));
    log(`ORDEN-INICIO: algoritmo=Burbuja tamaño=${arr.length}`);
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        log(`COMP: i=${j} (${arr[j].id}:${arr[j].type} f=${arr[j].fuel}%) vs j=${j+1} (${arr[j+1].id}:${arr[j+1].type} f=${arr[j+1].fuel}%)`);
        if (priorityValue(arr[j].type, arr[j].fuel, arr[j].timestamp) < priorityValue(arr[j+1].type, arr[j+1].fuel, arr[j+1].timestamp)) {
          [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
          log(`SWAP: i=${j} <-> j=${j+1}. Lista: [${arr.map(f=>f.id).join(", ")}]`);
        } else {
          log(`NO-SWAP. Lista: [${arr.map(f=>f.id).join(", ")}]`);
        }
      }
    }
    log(`ORDEN-FIN: algoritmo=Burbuja`);
    return arr;
  },

  insertion(list) {
    const arr = [...list];
    const log = (msg) => (controller.log ? controller.log(msg) : console.log(msg));
    log(`ORDEN-INICIO: algoritmo=Inserción tamaño=${arr.length}`);
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && priorityValue(arr[j].type, arr[j].fuel, arr[j].timestamp) < priorityValue(key.type, key.fuel, key.timestamp)) {
        arr[j + 1] = arr[j];
        log(`MOVER: ${arr[j + 1].id} a pos ${j + 1}. Lista: [${arr.map(f=>f.id).join(", ")}]`);
        j--;
      }
      arr[j + 1] = key;
      log(`INSERTAR: ${key.id} en pos ${j + 1}. Lista: [${arr.map(f=>f.id).join(", ")}]`);
    }
    log(`ORDEN-FIN: algoritmo=Inserción`);
    return arr;
  },

  selection(list) {
    const arr = [...list];
    const log = (msg) => (controller.log ? controller.log(msg) : console.log(msg));
    log(`ORDEN-INICIO: algoritmo=Selección tamaño=${arr.length}`);
    for (let i = 0; i < arr.length; i++) {
      let max = i;
      for (let j = i + 1; j < arr.length; j++) {
        log(`COMP: i=${max} (${arr[max].id}) vs j=${j} (${arr[j].id})`);
        if (priorityValue(arr[j].type, arr[j].fuel, arr[j].timestamp) > priorityValue(arr[max].type, arr[max].fuel, arr[max].timestamp)) {
          max = j;
        }
      }
      if (max !== i) {
        [arr[i], arr[max]] = [arr[max], arr[i]];
        log(`SWAP: pos ${i} <-> ${max}. Lista: [${arr.map(f=>f.id).join(", ")}]`);
      }
    }
    log(`ORDEN-FIN: algoritmo=Selección`);
    return arr;
  },

  quick(list) {
    const log = (msg) => (controller.log ? controller.log(msg) : console.log(msg));
    log(`ORDEN-INICIO: algoritmo=QuickSort tamaño=${list.length}`);
    function quickSort(arr) {
      if (arr.length <= 1) return arr;
      const pivot = arr[arr.length - 1];
      log(`PIVOTE: ${pivot.id} (${pivot.type})`);
      const left = [], equal = [], right = [];
      for (let i = 0; i < arr.length - 1; i++) {
        const f = arr[i];
        log(`COMP: ${f.id} (${f.type}) vs PIVOTE ${pivot.id} (${pivot.type})`);
        const cmp = priorityValue(f.type, f.fuel, f.timestamp) - priorityValue(pivot.type, pivot.fuel, pivot.timestamp);
        if (cmp > 0) left.push(f);
        else if (cmp === 0) equal.push(f);
        else right.push(f);
      }
      const res = [...quickSort(left), ...equal, pivot, ...quickSort(right)];
      log(`SUBLISTA-UNION: [${res.map(f=>f.id).join(", ")}]`);
      return res;
    }
    const sorted = quickSort([...list]);
    log(`ORDEN-FIN: algoritmo=QuickSort`);
    return sorted;
  }
};

function priorityValue(type, fuel = 100, timestamp = 0) {
  const map = { "Emergencia": 5, "Combustible": 4, "VIP": 3, "Carga": 2, "Comercial": 1 };
  const base = map[type] || 0;
  // desempate: para COMBUSTIBLE usar menor fuel => mayor prioridad; para iguales usar timestamp (menor timestamp = más antiguo)
  return base * 1000000 + (type === "Combustible" ? (100 - fuel) * 1000 : 0) - timestamp;
}
