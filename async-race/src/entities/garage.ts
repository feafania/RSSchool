import CarRouter from "../api/car/router";
import { CARS_PER_PAGE } from "../constants";

import Car from "./car";

const GarageState = {
  cars: new Map<number, Car>(),
  totalCount: 0,
  currentPage: 1,

  async refreshTotalCount() {
    this.totalCount = await CarRouter.getTotalCount();
  },

  incrementTotalCount() {
    this.totalCount++;
  },

  decrementTotalCount() {
    if (this.totalCount > 0) {
      this.totalCount--;
    }
  },

  incrementPage() {
    const totalPages = Math.ceil(this.totalCount / CARS_PER_PAGE);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  },

  decrementPage() {
    if (this.currentPage > 1) {
      this.currentPage++;
    }
  },

  resetCars() {
    this.cars.clear();
  },

  addCar(car: Car) {
    this.cars.set(car.id, car);
  },

  removeCarById(id: number) {
    this.cars.delete(id);
  },

  getCar(id: number): Car | undefined {
    return this.cars.get(id);
  },
};

export default GarageState;
