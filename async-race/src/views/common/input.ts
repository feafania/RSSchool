import "../../styles/input.css";
import { CarBrand } from "../../types/enum";
import { ControlConfig } from "../../types/interfaces";
import { getState, saveState } from "../../utils/helpers";

export function createInput(object: ControlConfig): HTMLDivElement {
  const wrapper = document.createElement("div");
  if (object.id) {
    wrapper.id = `${object.id}-wrapper`;
  }
  if (object.class) {
    wrapper.className = `${object.class}-wrapper`;
  }

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type car brand...";
  input.id = object.id ?? `input-${Date.now()}`;
  input.value = object.name || getState(input.id) || "";

  if (object.class) {
    input.className = object.class;
  }

  input.disabled = object.disabled || false;

  const datalist = document.createElement("datalist");
  const datalistId = `${input.id}-list`;
  datalist.id = datalistId;

  input.setAttribute("list", datalistId);
  input.addEventListener("input", () => {
    saveState({ key: input.id, value: input.value });
  });

  for (const brand of Object.values(CarBrand)) {
    const option = document.createElement("option");
    option.value = brand;
    datalist.append(option);
  }

  wrapper.append(input, datalist);
  return wrapper;
}
