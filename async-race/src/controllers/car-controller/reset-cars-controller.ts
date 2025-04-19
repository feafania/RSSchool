import GarageState from "../../entities/garage";
import { disableButton } from "../../utils/helpers";

export default async function resetCarsEvent() {
  const carBlocks = document.querySelectorAll<HTMLElement>(".car-block");
  disableButton(document, "#reset-button", true);

  for (const carBlock of carBlocks) {
    const id = Number(carBlock.dataset.id);
    const car = GarageState.getItem(id);
    if (car) {
      await car.stop();
    }
  }
  disableButton(document, "#race-button", false);
}
