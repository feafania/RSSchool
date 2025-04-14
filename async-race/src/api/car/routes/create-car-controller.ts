import { API_SETTINGS } from "../../../constants";
import { CarType } from "../../../types/interfaces";
import { CarCreateUpdateModel } from "../../../types/types";

export default async function createCar(
  car: CarCreateUpdateModel,
): Promise<CarType> {
  const url = `${API_SETTINGS.BASE_URL}:${API_SETTINGS.PORT}/${API_SETTINGS.PATH.GARAGE}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
  if (!response.ok) throw new Error("Failed to create car");

  return response.json();
}
