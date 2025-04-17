import { API_SETTINGS } from "../../../constants";
import { CarType } from "../../../types/interfaces";
import { buildUrl } from "../../../utils/helpers";

export default async function getCarByID(id: number): Promise<CarType> {
  const url = `${buildUrl(API_SETTINGS.PATH.GARAGE)}/${id}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Car with id ${id} not found`);
  return response.json();
}
