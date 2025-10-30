// Algoritmos de ordenamiento

export const sortingAlgorithms = {
  bubble(list, output) {
    const arr = [...list];
    let log = msg => (output.innerHTML += `<p>${msg}</p>`);

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
    let log = msg => (output.innerHTML += `<p>${msg}</p>`);

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && priorityValue(arr[j].type) < priorityValue(key.type)) {
        arr[j + 1] = arr[j];
        j--;
        log(`Moviendo ${arr[j + 1].id}`);
      }
      arr[j + 1] = key;
    }
    return arr;
  },

  selection(list, output) {
    const arr = [...list];
    let log = msg => (output.innerHTML += `<p>${msg}</p>`);

    for (let i = 0; i < arr.length; i++) {
      let max = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (priorityValue(arr[j].type) > priorityValue(arr[max].type)) max = j;
      }
      if (max !== i) {
        [arr[i], arr[max]] = [arr[max], arr[i]];
        log(`Intercambio: ${arr[i].id} <-> ${arr[max].id}`);
      }
    }
    return arr;
  },

  quick(list, output) {
    let log = msg => (output.innerHTML += `<p>${msg}</p>`);

    function quickSort(arr) {
      if (arr.length <= 1) return arr;
      const pivot = arr[arr.length - 1];
      const left = arr.filter(f => priorityValue(f.type) > priorityValue(pivot.type));
      const right = arr.filter(f => priorityValue(f.type) < priorityValue(pivot.type));
      log(`Pivote: ${pivot.id}`);
      return [...quickSort(left), pivot, ...quickSort(right)];
    }
    return quickSort([...list]);
  }
};

function priorityValue(type) {
  const map = { "Emergencia": 5, "Combustible": 4, "VIP": 3, "Carga": 2, "Comercial": 1 };
  return map[type] || 0;
}
