import "../../styles/main.css";
import { PageType } from "../../types/enum";

import { controlButton } from "./button";

export function createMain(onNavigate: (page: PageType) => void): HTMLElement {
  const main = document.createElement("main");
  main.className = "main";

  const controls = document.createElement("div");
  controls.className = "page-controls";

  const garageButton = controlButton(PageType.Garage, onNavigate);
  const winnersButton = controlButton(PageType.Winners, onNavigate);
  controls.append(garageButton, winnersButton);

  const viewContainer = document.createElement("div");
  viewContainer.className = "view-container";
  viewContainer.id = "view-container";

  main.append(controls, viewContainer);

  return main;
}
