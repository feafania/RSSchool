import { TOTAL_RANDOM_CARS } from "../../constants";
import CarRouter from "../../api/car/router";
import GarageState from "../../entities/garage";
import { PageType } from "../../types/enum";
import { getRandomColor, getRandomName } from "../../utils/helpers";
import refreshPage from "../refresh-controller";
import loadAndRenderCars from "../garage-controller";

export default async function GenerateCarsEvent() {
  for (let index = 0; index < TOTAL_RANDOM_CARS; index++) {
    const name = getRandomName();
    const color = getRandomColor();
    try {
      await CarRouter.createCar({ name, color });
    } catch (error) {
      console.error("Failed to render new cars:", error);
    }
  }
  await refreshPage(GarageState, PageType.Garage, loadAndRenderCars);
}
