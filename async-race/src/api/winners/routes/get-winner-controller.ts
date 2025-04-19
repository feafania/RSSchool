import { API_SETTINGS } from "../../../constants";
import { WinnerType } from "../../../types/interfaces";
import { buildUrl } from "../../../utils/helpers";

export default async function getWinnerByID(id: number): Promise<WinnerType> {
  const url = `${buildUrl(API_SETTINGS.PATH.WINNERS)}/${id}`;
  const response = await fetch(url);
  if (response.status === 404) {
    throw new Error("404");
  }
  if (!response.ok) throw new Error(`Winner with id ${id} not found`);
  return response.json();
}
