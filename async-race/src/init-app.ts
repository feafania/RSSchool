import createHeader from "./views/common/sections/header/header";
import createFooter from "./views/common/sections/footer/footer";
import createMain from "./views/common/sections/main/main";
import renderGarageView from "./views/pages/garage/garage";
import renderWinnersView from "./views/pages/winners/winners";
import "./global.css";
import { getState, saveState } from "./utils/helpers";
import { PageType } from "./types/enum";
import { VIEW_CONTAINER_NAME } from "./constants";

export default function initApp(root: HTMLElement) {
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

  const renderMap = {
    [PageType.Garage]: renderGarageView,
    [PageType.Winners]: renderWinnersView,
  };

  const renderFunction = renderMap[page as keyof typeof renderMap];

  if (renderFunction) {
    renderFunction().then((element) => checkView(page, element));
  }
}

function checkView(containerName: string, onRender: HTMLElement): void {
  const container = document.querySelector("#" + VIEW_CONTAINER_NAME);
  if (!container) return;
  const viewContainer = document.querySelector("#" + containerName);
  if (viewContainer) return;
  container.innerHTML = "";
  container.append(onRender);
}
