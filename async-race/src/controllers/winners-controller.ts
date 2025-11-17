import WinnersRouter from "../api/winners/router";
import WinnersState from "../entities/winners";
import { WinnerType } from "../types/interfaces";
import { WINNERS_PER_PAGE } from "../constants";
import WinnersTable from "../views/pages/winners/winners-table/winners-table";
import { WinnerElement } from "../views/pages/winners/winners-table/winner";

import PageController from "./page-controller";

export default async function loadAndRenderWinners(
  page: PageController<WinnerType>,
): Promise<void> {
  try {
    const winners = await WinnersRouter.getWinners({
      page: WinnersState.currentPage,
      sort: WinnersState.sortField,
      order: WinnersState.sortOrder,
    });

    page.list.innerHTML = "";

    WinnersTable.savePage(page);
    const table = WinnersTable.createTable();
    const header = WinnersTable.createHeader(async () =>
      loadAndRenderWinners(page),
    );
    table.append(header);

    const tbody = WinnersTable.createBody();

    let number_ = (WinnersState.currentPage - 1) * WINNERS_PER_PAGE;
    for (const winnerItem of winners) {
      WinnersState.addItem(winnerItem);
      number_ += 1;
      const winner = new WinnerElement({ ...winnerItem, num: number_ });
      const row = await winner.render();
      tbody.append(row);
    }

    table.append(tbody);
    page.list.append(table);
  } catch (error) {
    page.list.textContent = "Failed to load winners";
    console.error("Error loading winners:", error);
  }
}
