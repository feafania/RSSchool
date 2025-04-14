import { API_SETTINGS } from "../../../constants";

export default async function deleteCar(id: number): Promise<boolean> {
  const url = `${API_SETTINGS.BASE_URL}:${API_SETTINGS.PORT}/${API_SETTINGS.PATH.GARAGE}/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete car");
  return response.ok;
}
