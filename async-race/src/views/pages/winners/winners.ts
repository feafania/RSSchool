import "./winners.css";
import WinnersState from "../../../entities/winners";
import PageController from "../../../controllers/page-controller";
import loadAndRenderWinners from "../../../controllers/winners-controller";
import { WinnerType } from "../../../types/interfaces";

export default async function renderWinnersView(): Promise<HTMLElement> {
  await WinnersState.refreshTotalCount();
  const page = new PageController<WinnerType>(
    WinnersState,
    loadAndRenderWinners,
  );
  page.element.append(page.title.element);
  page.element.append(page.pagination.element);
  page.element.append(page.list);
  page.refresh();

  return page.element;
}
