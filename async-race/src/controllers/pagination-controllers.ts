import { PaginationState } from "../types/interfaces";
import createPagination from "../views/common/elements/pagination/pagination";
import { saveState } from "../utils/helpers";

export default class PaginationController {
  public element: HTMLElement;
  constructor(
    public state: PaginationState,
    public onPageChange: () => void,
  ) {
    this.element = document.createElement("div");
    this.state = state;
    this.create();
  }

  refresh(): void {
    const previousButton = this.element.querySelector(
      ".pagination-button:nth-of-type(1)",
    ) as HTMLButtonElement | null;
    const nextButton = this.element.querySelector(
      ".pagination-button:nth-of-type(2)",
    ) as HTMLButtonElement | null;

    if (previousButton) {
      previousButton.disabled = this.state.currentPage === 1;
    }

    if (nextButton) {
      nextButton.disabled = this.state.currentPage === this.state.totalPages();
    }

    const pageTitle = this.element.querySelector(".page-title");
    if (pageTitle) {
      pageTitle.textContent = `Page #${this.state.currentPage} / ${this.state.totalPages()}`;
      saveState({
        key: `${this.state.page}-page`,
        value: `${this.state.currentPage}`,
      });
    }
  }

  create() {
    const newElement = createPagination(this.state, this.onPageChange);
    this.element.replaceWith(newElement);
    this.element = newElement;
    this.refresh();
  }
}
