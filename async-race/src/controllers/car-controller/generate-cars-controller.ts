import { TOTAL_RANDOM_CARS } from "../../constants";
import CarRouter from "../../api/car/router";
import { getRandomColor, getRandomName } from "../../utils/helpers";

export default async function generateCarsEvent() {
  const carRequests = [];
  for (let index = 0; index < TOTAL_RANDOM_CARS; index++) {
    const name = getRandomName();
    const color = getRandomColor();
    carRequests.push(CarRouter.createCar({ name, color }));
  }
  const results = await Promise.allSettled(carRequests);

  const failed = results.filter((result) => result.status === "rejected");
  if (failed.length > 0) {
    console.warn(`Failed to create: ${failed.length}`);
    for (const error of failed) {
      console.warn(`  ${(error as PromiseRejectedResult).reason}`);
    }
  }
}
