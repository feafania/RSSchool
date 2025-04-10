// Button with props onClick and label, input with
// color selection and create/update button

import { PageType } from "../../types/enum";

export function controlButton(
  buttonName: PageType,
  onClick: (name: PageType) => void,
) {
  const control = document.createElement("button");
  control.textContent =
    buttonName.charAt(0).toUpperCase() + buttonName.slice(1).toLowerCase();
  control.addEventListener("click", () => onClick(buttonName));
  return control;
}
