import { ControlConfig } from "../../types/interfaces";
import "../../styles/button.css";

export function createButton(
  object: ControlConfig,
  onClick?: () => void,
): HTMLButtonElement {
  const control = document.createElement("button");
  if (object.name) {
    control.textContent = object.name;
  }
  if (object.id) {
    control.id = object.id;
  }
  if (object.class) {
    control.className = object.class;
  }

  control.disabled = object.disabled || false;

  control.addEventListener("click", () => {
    if (onClick) onClick();
  });

  return control;
}
