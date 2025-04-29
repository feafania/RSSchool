import "./search-button.css";
import createInput from "../../../../common/elements/input";
import createButton from "../../../../common/elements/button";

class SearchBar {
  public searchInput: HTMLInputElement;
  private clearButton: HTMLButtonElement;

  constructor() {
    this.searchInput = document.createElement("input");
    this.clearButton = document.createElement("button");
  }

  render(): HTMLElement {
    const searchBar = document.createElement("div");
    searchBar.className = "search-bar";

    const searchInputGroupe = this.renderInput();
    const clearButton = this.renderButton();

    searchBar.append(searchInputGroupe, clearButton);
    return searchBar;
  }

  private renderInput(): HTMLDivElement {
    const searchInputGroupe = createInput({
      type: "text",
      placeholder: "Search user...",
      class: "search-input",
    });
    const searchInput = searchInputGroupe.querySelector(
      "input",
    ) as HTMLInputElement;
    if (searchInput) {
      this.searchInput = searchInput;
    }
    this.addInputListeners();
    return searchInputGroupe;
  }

  private renderButton(): HTMLButtonElement {
    const clearButton = createButton({
      name: "×",
      class: "clear-search-button",
    });
    this.clearButton = clearButton;
    this.clearButton.style.display = "none";
    this.addButtonListeners();
    return clearButton;
  }

  private addInputListeners() {
    if (this.searchInput) {
      this.searchInput.addEventListener("input", () => {
        this.clearButton.style.display =
          this.searchInput.value.trim() === "" ? "none" : "block";
      });
    }
  }

  private addButtonListeners(): void {
    if (this.clearButton) {
      this.clearButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (this.searchInput) {
          this.searchInput.value = "";
          this.searchInput.focus();
          this.searchInput.dispatchEvent(new Event("input"));
        }
      });
    }
  }
}

const searchBar = new SearchBar();
export default searchBar;
