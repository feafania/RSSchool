import GarageState from "../../entities/garage";

export default async function resetCarsEvent() {
  const carBlocks = document.querySelectorAll<HTMLElement>(".car-block");

  for (const carBlock of carBlocks) {
    const id = Number(carBlock.dataset.id);
    const car = GarageState.getItem(id);
    if (car) {
      car.stop();
    }
  }
  const resetButton =
    document.querySelector<HTMLButtonElement>("#reset-button");
  if (resetButton) {
    resetButton.disabled = true;
  }
}
