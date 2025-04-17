import { getState } from "../utils/helpers";

export default class BaseState<T> {
  items = new Map<number, T>();
  totalCount = 0;
  currentPage = 0;
  readonly ITEMS_PER_PAGE: number;
  public page: string;

  constructor(itemsPerPage: number) {
    this.ITEMS_PER_PAGE = itemsPerPage;
    this.page = "";
  }

  resetItems() {
    this.items.clear();
  }

  addItem(item: T & { id: number }) {
    this.items.set(item.id, item);
  }

  removeItemById(id: number) {
    this.items.delete(id);
  }

  getItem(id: number): T | undefined {
    return this.items.get(id);
  }

  totalPages(): number {
    return Math.ceil(this.totalCount / this.ITEMS_PER_PAGE);
  }

  resetCurrentPage(): void {
    this.currentPage = Number(getState(`${this.page}-page`)) || 1;
  }

  limitCurrentPage(): void {
    this.currentPage = Math.max(
      Math.min(this.currentPage, this.totalPages()),
      1,
    );
  }

  incrementPage() {
    this.currentPage++;
    this.limitCurrentPage();
  }

  decrementPage() {
    this.currentPage--;
    this.limitCurrentPage();
  }

  async refreshTotalCount() {
    this.currentPage = Math.min(this.currentPage, this.totalPages());
  }
}
