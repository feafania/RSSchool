import { API_SETTINGS } from "../../../constants";
import { CarType } from "../../../types/interfaces";
import { CarCreateUpdateModel } from "../../../types/types";
import { buildUrl } from "../../../utils/helpers";

export default async function updateCar(
  id: number,
  carParameters: CarCreateUpdateModel,
): Promise<CarType> {
  const url = `${buildUrl(API_SETTINGS.PATH.GARAGE)}/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carParameters),
  });
  if (!response.ok) throw new Error("Failed to update car");

  return response.json();
}
