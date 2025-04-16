import CarRouter from "../api/car/router";
import { CARS_PER_PAGE } from "../constants";

import BaseState from "./base-state";
import Car from "./car";

class GarageStateClass extends BaseState<Car> {
  async refreshTotalCount() {
    this.totalCount = await CarRouter.getTotalCount();
    this.currentPage = Math.min(this.currentPage, this.totalPages());
  }
}

const GarageState = new GarageStateClass(CARS_PER_PAGE);
export default GarageState;
