import { API_SETTINGS } from "../../../constants";
import { buildUrl } from "../../../utils/helpers";

export default async function deleteCar(id: number): Promise<boolean> {
  const url = `${buildUrl(API_SETTINGS.PATH.GARAGE)}/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete car");
  return response.ok;
}
