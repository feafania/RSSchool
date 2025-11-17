import "./winners-table.css";
import PageController from "../../../../controllers/page-controller";
import { WinnerType } from "../../../../types/interfaces";
import { SortOrder, WinnerSortFields } from "../../../../types/enum";
import WinnersState from "../../../../entities/winners";
import { saveLocalState } from "../../../../utils/helpers";

const WinnersTable = {
  page: undefined as PageController<WinnerType> | undefined,
  element: undefined as HTMLTableElement | undefined,

  savePage(page: PageController<WinnerType>) {
    this.page = page;
  },

  createTable() {
    const table = document.createElement("table");
    table.className = "winners-table";
    this.element = table;
    return table;
  },

  createHeader(onSort: () => void) {
    const thead = document.createElement("thead");
    thead.className = "winners-table-header";
    const headerRow = document.createElement("tr");
    headerRow.className = "winners-table-row";
    const headers = this.headerLabels();
    for (const { label, field } of headers) {
      const headerLabel = document.createElement("th");
      headerLabel.className = headerLabel.className + " winners-header-label";
      headerLabel.textContent = label;

      if (field) {
        const sortIcon = document.createElement("span");
        sortIcon.className = "sort-icon";
        if (WinnersState.sortField === field) {
          sortIcon.textContent = "▲";
          sortIcon.className =
            sortIcon.className +
            (WinnersState.sortOrder === SortOrder.Asc ? " asc" : " desc");
          // sortIcon.textContent =
          //   WinnersState.sortOrder === SortOrder.Asc ? "▲" : "▼";
        }

        headerLabel.append(sortIcon);
        headerLabel.addEventListener("click", async () => {
          this.setWinnersSortField(field);
          onSort();
        });
      }
      headerRow.append(headerLabel);
    }

    thead.append(headerRow);
    if (this.element) {
      this.element.append(thead);
    }
    return thead;
  },

  createBody() {
    const tbody = document.createElement("tbody");
    tbody.className = "winners-body";
    if (this.element) {
      this.element.append(tbody);
    }
    return tbody;
  },

  headerLabels() {
    return [
      { label: "№" },
      { label: "Id", field: WinnerSortFields.id },
      { label: "Car" },
      { label: "Name" },
      { label: "Wins", field: WinnerSortFields.wins },
      { label: "Best time (seconds)", field: WinnerSortFields.time },
    ];
  },

  setWinnersSortField(field: WinnerSortFields) {
    if (WinnersState.sortField === field) {
      WinnersState.sortOrder =
        WinnersState.sortOrder === SortOrder.Asc
          ? SortOrder.Desc
          : SortOrder.Asc;
    } else {
      WinnersState.sortField = field;
      WinnersState.sortOrder = SortOrder.Asc;
      saveLocalState({
        key: "sortField",
        value: WinnersState.sortField,
      });
      saveLocalState({
        key: "sortOrder",
        value: WinnersState.sortOrder,
      });
    }
  },
};

export default WinnersTable;
