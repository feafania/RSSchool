import "./pagination.css";
import createButton from "../button/button";
import GarageState from "../../../../entities/garage";

export default function createPagination(): HTMLElement {
  const pagination = document.createElement("div");
  pagination.className = "pagination";
  const pageInfo = document.createElement("p");
  pageInfo.textContent = `Page #${GarageState.currentPage}`;
  pageInfo.className = "page-title";
  pagination.append(pageInfo);
  const previousButton = createButton({
    name: "Previous",
    class: "pagination-button",
  });
  const nextButton = createButton({
    name: "Next",
    class: "pagination-button",
  });
  pagination.append(previousButton, nextButton);
  return pagination;
}
