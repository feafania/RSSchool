import { API_SETTINGS } from "../../../constants";
import { WinnerType } from "../../../types/interfaces";
import { WinnerUpdateModel } from "../../../types/types";
import { buildUrl } from "../../../utils/helpers";

export default async function updateWinner(
  id: number,
  winnerParameters: WinnerUpdateModel,
): Promise<WinnerType> {
  const url = `${buildUrl(API_SETTINGS.PATH.WINNERS)}/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(winnerParameters),
  });
  if (response.status === 404) {
    throw new Error("404");
  }
  if (!response.ok) throw new Error("Failed to update winner");

  return response.json();
}
