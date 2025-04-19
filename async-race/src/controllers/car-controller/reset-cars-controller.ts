import GarageState from "../../entities/garage";
import { disableButton } from "../../utils/helpers";

export default async function resetCarsEvent() {
  const carBlocks = document.querySelectorAll<HTMLElement>(".car-block");
  disableButton(document, "#reset-button", true);

  const stopPromises: Promise<void>[] = [];

  for (const carBlock of carBlocks) {
    const id = Number(carBlock.dataset.id);
    const car = GarageState.getItem(id);
    if (car) {
      stopPromises.push(car.stop());
    }
  }

  await Promise.allSettled(stopPromises);

  disableButton(document, "#race-button", false);
}
