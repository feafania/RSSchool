export default class BaseState<T> {
  items = new Map<number, T>();
  totalCount = 0;
  currentPage = 1;
  readonly ITEMS_PER_PAGE: number;

  constructor(itemsPerPage: number) {
    this.ITEMS_PER_PAGE = itemsPerPage;
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

  incrementTotalCount() {
    this.totalCount++;
  }

  decrementTotalCount() {
    if (this.totalCount > 0) {
      this.totalCount--;
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalCount / this.ITEMS_PER_PAGE);
  }

  incrementPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  decrementPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
