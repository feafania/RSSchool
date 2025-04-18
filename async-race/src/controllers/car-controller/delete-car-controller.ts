import CarRouter from "../../api/car/router";
import GarageState from "../../entities/garage";
import { ErrorHandler } from "../../utils/helpers";
import { HTTP_STATUSES } from "../../constants";
import showModalMessage from "../../views/common/elements/modal-window/modal-window";
import WinnersRouter from "../../api/winners/router";

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
      showModalMessage,
    );
  }

  WinnersRouter.deleteWinner(id);
}
