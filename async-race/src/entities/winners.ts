import WinnersRouter from "../api/winners/router";
import { WINNERS_PER_PAGE } from "../constants";
import { WinnerType } from "../types/interfaces";
import { PageType, SortOrder, WinnerSortFields } from "../types/enum";
import { getLocalState } from "../utils/helpers";

import BaseState from "./base-state";

class WinnersStateClass extends BaseState<WinnerType> {
  public sortOrder: SortOrder;
  public sortField: WinnerSortFields;
  constructor(itemsPerPage: number) {
    super(itemsPerPage);
    this.page = PageType.Winners;
    this.resetCurrentPage();

    const savedOrder = getLocalState("sortOrder");
    this.sortOrder =
      savedOrder === SortOrder.Desc ? SortOrder.Desc : SortOrder.Asc;

    const savedField = getLocalState("sortField");
    const validFields = Object.values(WinnerSortFields);
    this.sortField = validFields.includes(savedField as WinnerSortFields)
      ? (savedField as WinnerSortFields)
      : WinnerSortFields.id;
  }

  async refreshTotalCount() {
    this.totalCount = await WinnersRouter.getTotalCount();
    this.limitCurrentPage();
  }
}

const WinnersState = new WinnersStateClass(WINNERS_PER_PAGE);
export default WinnersState;
