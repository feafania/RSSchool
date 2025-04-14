import "./header.css";
import { capitalizeString } from "../../../../utils/helpers";
import { PageType } from "../../../../types/enum";
import createButton from "../../elements/button/button";

export default function createHeader(
  onNavigate: (pageName: string) => void,
): HTMLElement {
  const header = document.createElement("header");
  header.className = "header";

  const title = document.createElement("h1");
  title.textContent = "Async Race";
  title.className = "title";

  const controls = document.createElement("div");
  controls.className = "page-controls";

  const garageButton = createButton(
    { name: capitalizeString(PageType.Garage), class: "view-button" },
    () => onNavigate(PageType.Garage),
  );
  const winnersButton = createButton(
    { name: capitalizeString(PageType.Winners), class: "view-button" },
    () => onNavigate(PageType.Winners),
  );
  controls.append(garageButton, winnersButton);
  header.append(title, controls);

  return header;
}
