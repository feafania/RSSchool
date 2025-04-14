import GarageState from "../entities/garage";
import CarRouter from "../api/car/router";
import Car from "../entities/car";
import renderCar from "../views/common/elements/car/car";

export default async function loadAndRenderCars(
  garageList: HTMLElement,
): Promise<void> {
  try {
    const cars = await CarRouter.getCars(GarageState.currentPage);
    garageList.innerHTML = "";

    for (const carElement of cars) {
      const car = new Car(carElement);
      GarageState.addCar(car);
      garageList.append(renderCar(car));
    }
  } catch (error) {
    garageList.textContent = "Failed to load cars";
    console.error("Error loading cars:", error);
  }
}
