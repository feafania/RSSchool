import { API_SETTINGS } from "../../../constants";
import { CarType } from "../../../types/interfaces";
import { CarCreateUpdateModel } from "../../../types/types";

export default async function updateCar(
  id: number,
  carParametres: CarCreateUpdateModel,
): Promise<CarType> {
  const url = `${API_SETTINGS.BASE_URL}:${API_SETTINGS.PORT}/${API_SETTINGS.PATH.GARAGE}/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carParametres),
  });
  if (!response.ok) throw new Error("Failed to update car");

  return response.json();
}
