import { TOTAL_RANDOM_CARS } from "../../constants";
import CarRouter from "../../api/car/router";
import { getRandomColor, getRandomName } from "../../utils/helpers";

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
}
