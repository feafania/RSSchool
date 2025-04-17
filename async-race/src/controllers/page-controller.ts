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
    public page: string,
    public state: BaseState<T>,
    public loadEvent: (page: PageController<T>) => void,
  ) {
    this.element = document.createElement("div");
    this.element.className = `${page}-view`;
    this.title = new TitleController<T>(page, state);
    this.list = document.createElement("div");
    this.list.className = `${page}-list`;
    this.loadEvent = loadEvent;
    this.onPageChange = () => {
      this.title.refresh();
      this.list.innerHTML = "";
      (async () => await this.loadList())();
      this.pagination.create();
    };
    this.pagination = new PaginationController(state, this.onPageChange);
    this.pagination.create();
  }

  async refresh() {
    try {
      this.title.refresh();
      this.loadEvent(this);
      this.pagination.refresh();
    } catch (error) {
      console.error("Failed to render new cars:", error);
    }
  }

  async loadList() {
    await this.loadEvent(this);
  }
}
