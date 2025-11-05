// Algoritmos de ordenamiento (corregidos y estables)

export const sortingAlgorithms = {
  bubble(list, output) {
    const arr = [...list];
    output.innerHTML += `<p>🔁 Iniciando Burbuja...</p>`;
    const log = msg => (output.innerHTML += `<p>${msg}</p>`);

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        log(`Comparando ${arr[j].id} (${arr[j].type}) con ${arr[j + 1].id} (${arr[j + 1].type})`);
        if (priorityValue(arr[j].type) < priorityValue(arr[j + 1].type)) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          log(`➡️ Intercambio: ${arr[j].id} y ${arr[j + 1].id}`);
        }
      }
    }
    return arr;
  },

  insertion(list, output) {
    const arr = [...list];
    output.innerHTML += `<p>🔁 Iniciando Inserción...</p>`;
    const log = msg => (output.innerHTML += `<p>${msg}</p>`);

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && priorityValue(arr[j].type) < priorityValue(key.type)) {
        arr[j + 1] = arr[j];
        log(`Moviendo ${arr[j + 1].id} a la posición ${j + 1}`);
        j--;
      }
      arr[j + 1] = key;
      log(`Insertando ${key.id} en la posición ${j + 1}`);
    }
    return arr;
  },

  selection(list, output) {
    const arr = [...list];
    output.innerHTML += `<p>🔁 Iniciando Selección...</p>`;
    const log = msg => (output.innerHTML += `<p>${msg}</p>`);

    for (let i = 0; i < arr.length; i++) {
      let max = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (priorityValue(arr[j].type) > priorityValue(arr[max].type)) max = j;
      }
      if (max !== i) {
        log(`Intercambio: ${arr[i].id} <-> ${arr[max].id}`);
        [arr[i], arr[max]] = [arr[max], arr[i]];
      }
    }
    return arr;
  },

  quick(list, output) {
    output.innerHTML += `<p>🔁 Iniciando QuickSort...</p>`;
    const log = msg => (output.innerHTML += `<p>${msg}</p>`);

    function quickSort(arr) {
      if (arr.length <= 1) return arr;
      const pivot = arr[arr.length - 1];
      const pVal = priorityValue(pivot.type);
      log(`Pivote: ${pivot.id} (${pivot.type})`);
      const rest = arr.slice(0, -1);
      const left = [];
      const equal = [];
      const right = [];

      rest.forEach(f => {
        const v = priorityValue(f.type);
        if (v > pVal) left.push(f);
        else if (v === pVal) equal.push(f);
        else right.push(f);
      });

      return [...quickSort(left), ...equal, pivot, ...quickSort(right)];
    }

    return quickSort([...list]);
  }
};

function priorityValue(type) {
  const map = { "Emergencia": 5, "Combustible": 4, "VIP": 3, "Carga": 2, "Comercial": 1 };
  return map[type] || 0;
}
