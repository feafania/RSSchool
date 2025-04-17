import { API_SETTINGS } from "../../../constants";
import { buildUrl } from "../../../utils/helpers";

export default async function deleteWinner(id: number): Promise<boolean> {
  const url = `${buildUrl(API_SETTINGS.PATH.WINNERS)}/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete winner");
  return response.ok;
}
