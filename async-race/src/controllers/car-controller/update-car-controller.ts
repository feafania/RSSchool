import { DEFAULT_CAR_COLOR, HTTP_STATUSES } from "../../constants";
import CarRouter from "../../api/car/router";
import GarageState from "../../entities/garage";
import showModalMessage from "../../views/common/elements/modal-window/modal-window";
import {
  deleteState,
  getState,
  ErrorHandler,
  saveState,
} from "../../utils/helpers";
import { CarCreateUpdateModel } from "../../types/types";

async function updateCar(
  id: string,
  object: CarCreateUpdateModel,
): Promise<boolean> {
  const car = GarageState.items.get(+id);
  try {
    if (car) {
      await CarRouter.updateCar(car.id, object);
    } else {
      showModalMessage("Car is not found!");
    }
    deleteState("updatedCarId");
    return true;
  } catch (error) {
    console.error("Failed to update car:", error);
    ErrorHandler(
      error as Response | Error,
      HTTP_STATUSES.NOT_FOUND_404,
      `Car with ID ${id} not found.`,
      "An error occurred when updating the car. Try again.",
    );
    return false;
  }
}

export default async function updateCarEvent() {
  const id = getState("updatedCarId");
  if (!id) {
    showModalMessage("Car is not selected!");
    return;
  }
  const brandInput = document.querySelector(
    "#update-brand-select",
  ) as HTMLInputElement | null;
  const colorInput = document.querySelector(
    "#update-car-color",
  ) as HTMLInputElement | null;
  const button = document.querySelector(
    "#update-car-button",
  ) as HTMLInputElement | null;

  const name = brandInput?.value.trim();
  const color = colorInput?.value || DEFAULT_CAR_COLOR;

  if (!name) {
    showModalMessage("Fill in the field with the name of the Car!");
    brandInput?.focus();
    return;
  }
  if (await updateCar(id, { name, color })) {
    if (brandInput) {
      brandInput.value = "";
      saveState({ key: id, value: "" });
      brandInput.disabled = true;
    }
    if (colorInput) {
      colorInput.disabled = true;
    }
    if (button) {
      button.disabled = true;
    }
  }
}
