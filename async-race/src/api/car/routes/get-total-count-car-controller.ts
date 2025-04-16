import { API_SETTINGS, CARS_PER_PAGE } from "../../../constants";

export default async function getTotalCountCars(): Promise<number> {
  let url = `${API_SETTINGS.BASE_URL}:${API_SETTINGS.PORT}/${API_SETTINGS.PATH.GARAGE}?_page=1&`;
  url = `${url}_limit=${CARS_PER_PAGE}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch cars count");
  }

  const totalCountHeader = response.headers.get("X-Total-Count");
  if (!totalCountHeader) {
    throw new Error("X-Total-Count header is missing");
  }

  return Number(totalCountHeader);
}
