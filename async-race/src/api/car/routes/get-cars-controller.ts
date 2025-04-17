import { API_SETTINGS, CARS_PER_PAGE } from "../../../constants";
import { CarType } from "../../../types/interfaces";
import { GetItems } from "../../../types/types";
import { buildUrl } from "../../../utils/helpers";

export default async function getCars(
  page?: number,
  limit = CARS_PER_PAGE,
): Promise<GetItems<CarType>> {
  const parameters = new URLSearchParams();
  if (page !== undefined) parameters.set("_page", page.toString());
  if (limit !== undefined) parameters.set("_limit", limit.toString());

  const baseUrl = `${buildUrl(API_SETTINGS.PATH.GARAGE)}`;
  const url =
    parameters.toString().length > 0
      ? `${baseUrl}?${parameters.toString()}`
      : baseUrl;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch cars");

  const totalCountHeader = response.headers.get("X-Total-Count");
  const totalCount = totalCountHeader
    ? Number.parseInt(totalCountHeader, 10)
    : 0;
  const items: CarType[] = await response.json();

  return { items, totalCount };
}
