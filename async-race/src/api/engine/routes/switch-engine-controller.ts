import { API_SETTINGS } from "../../../constants";
import { EngineStartResponse } from "../../../types/interfaces";
import { buildUrl } from "../../../utils/helpers";
import { EngineStatus } from "../../../types/enum";

export default async function switchEngine(
  id: number,
  status: EngineStatus,
): Promise<EngineStartResponse> {
  const baseUrl = `${buildUrl(API_SETTINGS.PATH.ENGINE)}`;

  const parameters = new URLSearchParams();
  if (id !== undefined) parameters.set("id", id.toString());
  if (status !== undefined) parameters.set("status", status.toString());
  const url =
    parameters.toString().length > 0
      ? `${baseUrl}?${parameters.toString()}`
      : baseUrl;

  const response = await fetch(url, {
    method: "PATCH",
  });
  if (response.status === 400) {
    throw new Error("400");
  }
  if (response.status === 404) {
    throw new Error("404");
  }
  if (response.status === 429) {
    throw new Error("429");
  }
  if (response.status === 500) {
    throw new Error("500");
  }
  if (!response.ok) {
    throw new Error(
      `Failed switching engine with status "${status}" and id ${id}`,
    );
  }

  return response.json();
}
