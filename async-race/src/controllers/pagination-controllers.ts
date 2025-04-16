import { PaginationState } from "../types/interfaces";

export default function refreshPaginationState(
  state: PaginationState,
  pagination: HTMLElement,
): void {
  const previousButton = pagination.querySelector(
    ".pagination-button:nth-of-type(1)",
  ) as HTMLButtonElement | null;
  const nextButton = pagination.querySelector(
    ".pagination-button:nth-of-type(2)",
  ) as HTMLButtonElement | null;

  if (previousButton) {
    previousButton.disabled = state.currentPage === 1;
  }

  if (nextButton) {
    nextButton.disabled = state.currentPage === state.totalPages();
  }

  const pageTitle = pagination.querySelector(".page-title");
  if (pageTitle) {
    pageTitle.textContent = `Page #${state.currentPage}`;
  }
}
