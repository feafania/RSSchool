import CarRouter from "../api/car/router";
import { CARS_PER_PAGE } from "../constants";
import { PageType } from "../types/enum";

import BaseState from "./base-state";
import Car from "./car";

class GarageStateClass extends BaseState<Car> {
  constructor(itemsPerPage: number) {
    super(itemsPerPage);
    this.page = PageType.Garage;
    this.resetCurrentPage();
  }
  async refreshTotalCount() {
    this.totalCount = await CarRouter.getTotalCount();
    this.limitCurrentPage();
  }
}

const GarageState = new GarageStateClass(CARS_PER_PAGE);
export default GarageState;
