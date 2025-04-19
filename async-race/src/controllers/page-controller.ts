import BaseState from "../entities/base-state";

import TitleController from "./title-controllers";
import PaginationController from "./pagination-controllers";

export default class PageController<T> {
  public element: HTMLElement;
  public title: TitleController<T>;
  public list: HTMLElement;
  public pagination: PaginationController;
  public onPageChange: () => void;

  constructor(
    public state: BaseState<T>,
    public loadEvent: (page: PageController<T>) => void,
  ) {
    this.element = document.createElement("div");
    this.element.className = `${state.page}-view`;
    this.title = new TitleController<T>(state.page, state);
    this.list = document.createElement("div");
    this.list.className = `${state.page}-list`;
    this.loadEvent = loadEvent;
    this.onPageChange = () => {
      (async () => await this.title.refresh())();
      this.list.innerHTML = "";
      (async () => await this.loadList())();
      (async () => await this.pagination.create())();
    };
    this.pagination = new PaginationController(state, this.onPageChange);
    this.pagination.create();
  }

  async refresh() {
    try {
      await this.title.refresh();
      this.loadEvent(this);
      await this.pagination.refresh();
    } catch (error) {
      console.error("Failed to render new cars:", error);
    }
  }

  async loadList() {
    this.loadEvent(this);
  }
}
