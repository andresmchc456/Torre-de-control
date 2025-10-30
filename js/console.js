import { controller } from "./controller.js";

export function init() {
  const box = document.getElementById("consoleBox");
  const clearBtn = document.getElementById("clearConsole");

  const render = () => {
    box.innerHTML = controller.logs.join("<br>");
  };

  controller.log = msg => {
    controller.logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
    render();
  };

  clearBtn.addEventListener("click", () => {
    controller.logs = [];
    render();
  });

  if (!controller.logs) controller.logs = [];
  render();
}
