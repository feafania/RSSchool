import "./modal-window.css";

export default function showModalMessage(message: string): void {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  const modal = document.createElement("div");
  modal.className = "modal";

  const text = document.createElement("p");
  text.className = "modal-text";
  text.textContent = message;

  const button = document.createElement("button");
  button.className = "modal-button";
  button.textContent = "OK";

  button.addEventListener("click", () => {
    overlay.remove();
  });

  modal.append(text);
  modal.append(button);
  overlay.append(modal);
  document.body.append(overlay);
}
