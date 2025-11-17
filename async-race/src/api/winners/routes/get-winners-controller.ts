import { API_SETTINGS, WINNERS_PER_PAGE } from "../../../constants";
import { GetWinnersOptions, WinnerType } from "../../../types/interfaces";
import { GetItems } from "../../../types/types";
import { buildUrl } from "../../../utils/helpers";

export default async function getWinners(
  { page, sort, order }: GetWinnersOptions = {},
  limit = WINNERS_PER_PAGE,
): Promise<GetItems<WinnerType>> {
  const parameters = new URLSearchParams();
  if (page !== undefined) parameters.set("_page", page.toString());
  if (limit !== undefined) parameters.set("_limit", limit.toString());
  if (sort) parameters.set("_sort", sort);
  if (order) parameters.set("_order", order);

  const baseUrl = `${buildUrl(API_SETTINGS.PATH.WINNERS)}`;
  const url =
    parameters.toString().length > 0
      ? `${baseUrl}?${parameters.toString()}`
      : baseUrl;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch winners");

  const totalCountHeader = response.headers.get("X-Total-Count");
  const totalCount = totalCountHeader
    ? Number.parseInt(totalCountHeader, 10)
    : 0;
  const items: WinnerType[] = await response.json();

  return { items, totalCount };
}
