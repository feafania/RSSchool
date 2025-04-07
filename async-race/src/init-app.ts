export default function initApp(root: HTMLElement) {
  root.innerHTML = "";
  const header = document.createElement("header");
  header.textContent = "Async race";
  const main = document.createElement("main");
  const footer = document.createElement("footer");
  root.append(header, main, footer);
}
