import RaceState from "../../entities/race";
import GarageState from "../../entities/garage";
import { RaceResponse } from "../../types/interfaces";
import { disableButton } from "../../utils/helpers";
import showWinnerBanner from "../../views/common/elements/banner/banner";
import Car from "../../entities/car";
import WinnersState from "../../entities/winners";
import CarControls from "../../views/pages/garage/car-controls/car-controls";

export default async function raceCarsEvent() {
  // await resetCarsEvent();
  disableButton(document, "#race-button", true);
  const paginationState = savePaginationState();
  disableButton(document, ".remove-button", true);
  disableButton(document, ".pagination-button", true);
  disableButton(document, ".winners-view-button", true);

  RaceState.race();
  const carBlocks = document.querySelectorAll<HTMLElement>(".car-block");
  const racePromises: Promise<RaceResponse | undefined>[] = [];

  for (const carBlock of carBlocks) {
    const id = Number(carBlock.dataset.id);
    const car = GarageState.getItem(id);
    if (!car) continue;

    const racePromise = getCarPromise(car);
    racePromises.push(racePromise);
  }

  try {
    const winner = await Promise.any(racePromises.filter(Boolean));
    if (winner) {
      const message = `${winner.car.name} wins in ${(winner.time / 1000).toFixed(2)}s!`;
      showWinnerBanner(message);
      console.info(message);
      await WinnersState.updateWinner(winner.car, winner.time / 1000);
    }
  } catch {
    showWinnerBanner(`There is no winner in this race!`);
  } finally {
    RaceState.stop();
    CarControls.checkState();
    disableButton(document, ".remove-button", false);
    disableButton(document, ".winners-view-button", false);
    restorePaginationState(paginationState);
  }
}

async function getCarPromise(car: Car): Promise<RaceResponse> {
  return car.run().then(() => {
    if (!RaceState.isRacing || car.position.progress !== 1) {
      throw new Error("Car did not finish");
    }
    return { car, time: car.finishTime ?? 0 };
  });
}

function savePaginationState() {
  const paginationState = [];
  const buttons =
    document.querySelectorAll<HTMLButtonElement>(".pagination-button");

  for (const button of buttons) {
    paginationState.push(button.disabled);
  }
  return paginationState;
}

function restorePaginationState(paginationState: Array<boolean>) {
  const buttons =
    document.querySelectorAll<HTMLButtonElement>(".pagination-button");

  let index = 0;
  for (const button of buttons) {
    button.disabled = paginationState[index++] ?? false;
  }
}
