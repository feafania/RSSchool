import { CarType } from "../../types/interfaces";
import { CarCreateUpdateModel } from "../../types/types";

import getCars from "./routes/get-cars-controller";
import getCarByID from "./routes/get-car-controller";
import createCar from "./routes/create-car-controller";
import updateCar from "./routes/update-car-controller";
import deleteCar from "./routes/delete-car-controller";

const CarRouter = {
  totalCount: 0,
  async getCars(page?: number): Promise<CarType[]> {
    try {
      const cars = await getCars(page);
      this.totalCount = cars.totalCount;
      return cars.items;
    } catch (error) {
      console.error("Error fetching cars:", error);
      this.totalCount = 0;
      return [];
    }
  },

  async getTotalCount(): Promise<number> {
    try {
      await this.getCars();
    } catch (error) {
      console.error(`Error fetching total count:`, error);
    }
    return this.totalCount;
  },

  async getCar(id: number): Promise<CarType | undefined> {
    try {
      return await getCarByID(id);
    } catch (error) {
      console.error(`Error fetching car {${id}:`, error);
      return undefined;
    }
  },

  async createCar(car: CarCreateUpdateModel): Promise<CarType | undefined> {
    try {
      return await createCar(car);
    } catch (error) {
      console.error("Error creating car:", error);
      return undefined;
    }
  },

  async updateCar(
    id: number,
    carParameters: CarCreateUpdateModel,
  ): Promise<CarType | undefined> {
    try {
      return await updateCar(id, carParameters);
    } catch (error) {
      console.error("Error updating car:", error);
      return undefined;
    }
  },

  async deleteCar(id: number): Promise<boolean> {
    try {
      return await deleteCar(id);
    } catch (error) {
      console.error("Error deleting car:", error);
      return false;
    }
  },
};

export default CarRouter;
