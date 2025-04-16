import { API_SETTINGS, CARS_PER_PAGE } from "../../../constants";
import { CarType } from "../../../types/interfaces";

export default async function getCars(
  page: number | undefined = undefined,
  limit = CARS_PER_PAGE,
): Promise<CarType[]> {
  let url = `${API_SETTINGS.BASE_URL}:${API_SETTINGS.PORT}/${API_SETTINGS.PATH.GARAGE}?`;
  url = page ? `${url}_page=${page}&` : url;
  if (page) {
    url = limit ? `${url}_limit=${limit}&` : url;
  }
  url = url.replace(/[?&]$/, "");
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch cars");

  return response.json();
}
