import CarRouter from "../../api/car/router";
import { PageType } from "../../types/enum";
import GarageState from "../../entities/garage";
import loadAndRenderCars from "../garage-controller";
import refreshPage from "../refresh-controller";
import { notFoundErrorHandler } from "../../utils/helpers";

export default async function deleteCarEvent(id: number) {
  try {
    await CarRouter.deleteCar(id);
    GarageState.items.delete(id);
  } catch (error) {
    console.error("Failed to delete car:", error);
    notFoundErrorHandler(
      error as Response | Error,
      `Car with ID ${id} not found.`,
      "An error occurred when deleting the car. Try again.",
    );
  }
  GarageState.refreshTotalCount();
  await refreshPage(GarageState, PageType.Garage, loadAndRenderCars);

  // TODO delete winner with id
}
