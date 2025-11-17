import { capitalizeString } from "../utils/helpers";
import BaseState from "../entities/base-state";

export default class TitleController<T> {
  public element: HTMLElement;
  constructor(
    public page: string,
    public state: BaseState<T>,
  ) {
    this.page = page;
    this.state = state;
    this.element = document.createElement("h2");
    this.element.className = `${this.page}-title`;
  }

  async refresh(): Promise<void> {
    await this.state.refreshTotalCount();
    this.element.textContent = `${capitalizeString(this.page)} (${this.state.totalCount})`;
  }
}
