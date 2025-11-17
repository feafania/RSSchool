import { saveState } from "../../utils/helpers";
import GarageState from "../../entities/garage";
import showModalMessage from "../../views/common/elements/modal-window/modal-window";

export default async function selectCarEvent(id: number) {
  saveState({ key: "updatedCarId", value: id.toString() });

  const brandInput = document.querySelector(
    "#update-brand-select",
  ) as HTMLInputElement | null;
  const colorInput = document.querySelector(
    "#update-car-color",
  ) as HTMLInputElement | null;
  const button = document.querySelector(
    "#update-car-button",
  ) as HTMLInputElement | null;

  const car = GarageState.items.get(id);

  if (!car) {
    showModalMessage(`Car with ID ${id} not found in Garage.`);
    return;
  }

  if (brandInput) {
    brandInput.value = car.name;
    saveState({ key: brandInput.id, value: brandInput.value });
    brandInput.focus();
    brandInput.disabled = false;
  }

  if (colorInput) {
    colorInput.value = car.color;
    colorInput.style.backgroundColor = colorInput.value;
    saveState({ key: colorInput.id, value: colorInput.value });
    colorInput.disabled = false;
  }

  if (button) {
    button.disabled = false;
  }
}
