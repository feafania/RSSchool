import { createHeader } from "./views/common/header";
import { createFooter } from "./views/common/footer";
import { createMain } from "./views/common/main";
import { renderGarageView } from "./views/pages/garage";
import { renderWinnersView } from "./views/pages/winners";
import "./styles/global.css";
import { getState, saveState } from "./utils/helpers";
import { PageType } from "./types/enum";
import { VIEW_CONTAINER_NAME } from "./constants";

export default function initApp(root: HTMLElement) {
  root.id = "root";
  root.innerHTML = "";
  const lastPage = getState("lastPage") || PageType.Garage;

  const header = createHeader(onNavigation);
  const main = createMain();
  const footer = createFooter();

  root.append(header, main, footer);
  onNavigation(lastPage);
}

function onNavigation(page: string): void {
  saveState({ key: "lastPage", value: page });
  if (page === PageType.Garage) {
    checkView(page, renderGarageView);
  } else if (page === PageType.Winners) {
    checkView(page, renderWinnersView);
  }
}

function checkView(containerName: string, onRender: () => HTMLElement): void {
  const container = document.querySelector("#" + VIEW_CONTAINER_NAME);
  if (!container) return;
  const viewContainer = document.querySelector("#" + containerName);
  if (viewContainer) return;
  container.innerHTML = "";
  container.append(onRender());
}
