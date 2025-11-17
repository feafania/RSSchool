import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import "./color-selection.css";

import { ControlConfig } from "../../../../types/interfaces";
import { DEFAULT_CAR_COLOR } from "../../../../constants";
import { getState, saveState } from "../../../../utils/helpers";

export default function createColorPicker(
  object: ControlConfig,
): HTMLInputElement {
  Coloris.init();
  Coloris({ el: "#coloris" });

  const colorPicker = document.createElement("input");
  colorPicker.type = "text";
  colorPicker.className = object.class ? `${object.class} coloris` : "coloris";

  colorPicker.dataset.coloris = "";

  colorPicker.id = object.id ?? `color-picker-${Date.now()}`;

  if (object.class) {
    colorPicker.className = object.class;
  }

  colorPicker.disabled = object.disabled || false;

  colorPicker.value =
    object.name || getState(colorPicker.id) || DEFAULT_CAR_COLOR;
  colorPicker.readOnly = true;
  colorPicker.style.backgroundColor = colorPicker.value;

  colorPicker.addEventListener("input", () => {
    colorPicker.style.backgroundColor = colorPicker.value;
    saveState({ key: colorPicker.id, value: colorPicker.value });
  });

  Coloris.close();
  return colorPicker;
}
