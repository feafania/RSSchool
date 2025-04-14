import { CarType } from "../../types/interfaces";
import { CarCreateUpdateModel } from "../../types/types";
import Car from "../../entities/car";

import getCars from "./routes/get-cars-controller";
import getCar from "./routes/get-car-controller";
import createCar from "./routes/create-car-controller";
import updateCar from "./routes/update-car-controller";
import deleteCar from "./routes/delete-car-controller";

const CarRouter = {
  async getCars(page: number | undefined = undefined): Promise<CarType[]> {
    try {
      return await getCars(page);
    } catch (error) {
      console.error("Error fetching cars:", error);
      return [];
    }
  },

  async getTotalCount(): Promise<number> {
    const totalCount = await this.getCars();
    return totalCount.length;
  },

  async getCar(id: number): Promise<CarType | undefined> {
    try {
      return await getCar(id);
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
    carParametres: CarCreateUpdateModel,
  ): Promise<CarType | undefined> {
    try {
      return await updateCar(id, carParametres);
    } catch (error) {
      console.error("Error updating car:", error);
      return undefined;
    }
  },

  async deleteCar(car: Car): Promise<boolean> {
    try {
      return await deleteCar(car.id);
    } catch (error) {
      console.error("Error deleting car:", error);
      return false;
    }
  },
};

export default CarRouter;
