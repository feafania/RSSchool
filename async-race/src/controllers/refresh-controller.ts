import { PageType } from "../types/enum";
import { PaginationState } from "../types/interfaces";

import refreshTitle from "./title-controllers";
import refreshPaginationState from "./pagination-controllers";

export default async function refreshPage(
  state: PaginationState,
  page: PageType,
  loadEvent: (element: HTMLElement) => void,
) {
  try {
    const title = document.querySelector(`.${page}-title`) as HTMLElement;
    if (title) {
      await refreshTitle(PageType.Garage, title);
    }

    const list = document.querySelector(`.${page}-list`) as HTMLElement;
    if (list) {
      await loadEvent(list);
    }

    const pagination = document.querySelector(".pagination") as HTMLElement;
    if (pagination) {
      refreshPaginationState(state, pagination);
    }
  } catch (error) {
    console.error("Failed to render new cars:", error);
  }
}
