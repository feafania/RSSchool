import "../../styles/header.css";

export function createHeader(): HTMLElement {
  const header = document.createElement("header");
  header.className = "header";

  const title = document.createElement("h1");
  title.textContent = "Async Race";
  header.append(title);

  return header;
}
