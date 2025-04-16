import GarageState from "../entities/garage";
import { capitalizeString } from "../utils/helpers";

export default async function refreshTitle(page: string, title: HTMLElement) {
  await GarageState.refreshTotalCount();

  if (title) {
    title.textContent = `${capitalizeString(page)} (${GarageState.totalCount})`;
  }
}
