import { PaginationState } from "../types/interfaces";
import createPagination from "../views/common/elements/pagination/pagination";
import { disableButton, saveState } from "../utils/helpers";

export default class PaginationController {
  public element: HTMLElement;
  constructor(
    public state: PaginationState,
    public onPageChange: () => void,
  ) {
    this.element = document.createElement("div");
    this.state = state;
    (async () => await this.create())();
  }

  async refresh() {
    disableButton(
      this.element,
      ".pagination-button:nth-of-type(1)",
      this.state.currentPage <= 1,
    );
    disableButton(
      this.element,
      ".pagination-button:nth-of-type(2)",
      this.state.currentPage >= this.state.totalPages(),
    );

    const pageTitle = this.element.querySelector(".page-title");
    if (pageTitle) {
      pageTitle.textContent = `Page #${this.state.currentPage} / ${this.state.totalPages()}`;
      saveState({
        key: `${this.state.page}-page`,
        value: `${this.state.currentPage}`,
      });
    }
  }

  async create() {
    const newElement = createPagination(this.state, this.onPageChange);
    this.element.replaceWith(newElement);
    this.element = newElement;
    await this.refresh();
  }
}
