import { API_SETTINGS } from "../../../constants";
import { WinnerType } from "../../../types/interfaces";
import { buildUrl } from "../../../utils/helpers";

export default async function createWinner(
  winner: WinnerType,
): Promise<WinnerType> {
  const url = `${buildUrl(API_SETTINGS.PATH.WINNERS)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(winner),
  });
  if (response.status === 500) {
    throw new Error("500");
  }
  if (!response.ok) throw new Error("Failed to create winner");

  return response.json();
}
