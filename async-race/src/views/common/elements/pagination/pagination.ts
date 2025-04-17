import createButton from "../button/button";
import "./pagination.css";
import { PaginationState } from "../../../../types/interfaces";

export default function createPagination(
  state: PaginationState,
  onPageChange: () => void,
): HTMLElement {
  const pagination = document.createElement("div");
  pagination.className = "pagination";
  const pageInfo = document.createElement("p");

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

  previousButton.addEventListener("click", async () => {
    state.decrementPage();
    await onPageChange();
  });

  nextButton.addEventListener("click", async () => {
    state.incrementPage();
    await onPageChange();
  });

  pagination.append(previousButton, nextButton);

  return pagination;
}
