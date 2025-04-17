import { CarType, WinnerRow } from "../../../../types/interfaces";
import CarRouter from "../../../../api/car/router";
import CarElement from "../car/car";

export class WinnerElement {
  public winner: WinnerRow;
  public car: CarType | undefined;

  constructor(winner: WinnerRow) {
    this.winner = winner;
  }

  async getCar() {
    this.car = await CarRouter.getCar(this.winner.id);
  }

  async render() {
    if (!this.car) {
      await this.getCar();
    }

    const row = document.createElement("tr");
    row.classList.add("winners-table-row");

    const numberCell = document.createElement("td");
    numberCell.classList.add("winners-data");
    numberCell.textContent = this.winner.num.toString();
    const idCell = document.createElement("td");
    idCell.classList.add("winners-data");
    idCell.textContent = this.winner.id.toString();
    const carCell = document.createElement("td");
    carCell.classList.add("winners-data");

    const carPicture = CarElement.renderCarPicture(this.car?.color || "");
    carPicture.className = "winners-car-picture";
    if (carPicture.firstElementChild instanceof SVGElement) {
      carPicture.firstElementChild.setAttribute("class", "winners-car-image");
    }
    carCell.append(carPicture);

    const nameCell = document.createElement("td");
    nameCell.classList.add("winners-name");
    nameCell.textContent = this.car ? this.car.name : "";
    const winsCell = document.createElement("td");
    winsCell.classList.add("winners-data");
    winsCell.textContent = this.winner.wins.toString();
    const timeCell = document.createElement("td");
    timeCell.classList.add("winners-data");
    timeCell.textContent = this.winner.time.toFixed(2); // seconds

    row.append(numberCell, idCell, carCell, nameCell, winsCell, timeCell);
    return row;
  }
}
