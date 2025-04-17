import CarRouter from "../../api/car/router";
import GarageState from "../../entities/garage";
import { ErrorHandler } from "../../utils/helpers";
import { HTTP_STATUSES } from "../../constants";
import WinnersRouter from "../../api/winners/router";
import WinnersState from "../../entities/winners";

export default async function deleteCarEvent(id: number) {
  try {
    await CarRouter.deleteCar(id);
    GarageState.items.delete(id);
  } catch (error) {
    console.error("Failed to delete car:", error);
    ErrorHandler(
      error as Response | Error,
      HTTP_STATUSES.NOT_FOUND_404,
      `Car with ID ${id} not found.`,
      "An error occurred when deleting the car. Try again.",
    );
  }

  try {
    await WinnersRouter.deleteWinner(id);
    WinnersState.items.delete(id);
  } catch (error) {
    if (
      error instanceof Response &&
      error.status === HTTP_STATUSES.NOT_FOUND_404
    ) {
      // ignore
    } else {
      console.error("Failed to delete winner:", error);
    }
  }
}
