// Router simple para navegar sin recargar
export async function navigateTo(view) {
  const app = document.getElementById("app");
  try {
    const res = await fetch(`components/${view}.html`);
    const html = await res.text();
    app.innerHTML = html;

    const scriptPath = `js/${view}.js`;
    const exists = await fetch(scriptPath).then(r => r.ok);
    if (exists) {
      const module = await import(`./${view}.js`);
      if (module.init) module.init();
    }
  } catch {
    app.innerHTML = `<div class="alert alert-danger">Error cargando la vista: ${view}</div>`;
  }
}
