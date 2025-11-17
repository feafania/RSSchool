import { DEFAULT_CAR_COLOR } from "../../constants";
import CarRouter from "../../api/car/router";
import showModalMessage from "../../views/common/elements/modal-window/modal-window";
import { saveState } from "../../utils/helpers";

export default async function createCarEvent() {
  const brandInput = document.querySelector(
    "#create-brand-select",
  ) as HTMLInputElement | null;
  const colorInput = document.querySelector(
    "#create-car-color",
  ) as HTMLInputElement | null;

  const name = brandInput?.value.trim();
  const color = colorInput?.value || DEFAULT_CAR_COLOR;

  if (!name) {
    showModalMessage("Fill in the field with the name of the Car!");
    brandInput?.focus();
    return;
  }

  try {
    await CarRouter.createCar({ name, color });
    if (brandInput) {
      brandInput.value = "";
      saveState({ key: brandInput.id, value: brandInput.value });
    }
  } catch (error) {
    console.error("Failed to create car:", error);
    showModalMessage("An error occurred when creating the car. Try again.");
    return;
  }
}
