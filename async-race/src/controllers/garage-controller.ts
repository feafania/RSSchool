import GarageState from "../entities/garage";
import CarRouter from "../api/car/router";
import Car from "../entities/car";
import CarElement from "../views/common/elements/car/car";

import PageController from "./page-controller";

export default async function loadAndRenderCars(
  page: PageController<Car>,
): Promise<void> {
  try {
    const cars = await CarRouter.getCars(GarageState.currentPage);
    page.list.innerHTML = "";

    for (const carItem of cars) {
      const car = new Car(carItem);
      GarageState.addItem(car);
      const carElement = new CarElement(page, car);
      page.list.append(carElement.element);
    }
  } catch (error) {
    page.list.textContent = "Failed to load cars";
    console.error("Error loading cars:", error);
  }
}
