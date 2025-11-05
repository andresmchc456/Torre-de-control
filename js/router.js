// Router simple para navegar sin recargar
// Función: carga el HTML parcial `components/{view}.html` dentro del <main id="app">,
// luego intenta importar el módulo JS `js/{view}.js` y llamar a su función `init()` si existe.
// Esto permite que cada componente tenga su propio script de inicialización.
export async function navigateTo(view) {
  const app = document.getElementById("app");
  try {
    // Cargar la plantilla HTML del componente
    const res = await fetch(`components/${view}.html`);
    const html = await res.text();
    app.innerHTML = html;

    // Intentar cargar el módulo JS asociado a la vista (si existe)
    const scriptPath = `js/${view}.js`;
    const exists = await fetch(scriptPath).then(r => r.ok);
    if (exists) {
      // Import dinámico para ejecutar la lógica de la vista (inicializadores)
      const module = await import(`./${view}.js`);
      if (module.init) module.init();
    }
  } catch {
    // Mensaje amigable en caso de error de carga
    app.innerHTML = `<div class="alert alert-danger">Error cargando la vista: ${view}</div>`;
  }
}
