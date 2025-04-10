import { createHeader } from "./views/common/header";
import { createFooter } from "./views/common/footer";
import { createMain } from "./views/common/main";
import { renderGarageView } from "./views/pages/garage";
import { renderWinnersView } from "./views/pages/winners";
import "./styles/global.css";
import { PageType } from "./types/enum";

export default function initApp(root: HTMLElement) {
  root.id = "root";
  root.innerHTML = "";

  const header = createHeader();

  const main = createMain((page: PageType) => {
    const container = document.querySelector("#view-container");
    if (!container) return;
    container.innerHTML = "";
    if (page === "garage") {
      container.append(renderGarageView());
    } else if (page === "winners") {
      container.append(renderWinnersView());
    }
  });

  const footer = createFooter();

  root.append(header, main, footer);
}
