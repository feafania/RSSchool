import carSvg from "../../../../assets/svg/sport-car.svg";
import flagSvg from "../../../../assets/svg/finish-flag.svg";
import "./car.css";
import { DEFAULT_CAR_COLOR } from "../../../../constants";
import createButton from "../button/button";
import Car from "../../../../entities/car";
import deleteCarEvent from "../../../../controllers/car-controller/delete-car-controller";
import selectCarEvent from "../../../../controllers/car-controller/select-car-controller";
import PageController from "../../../../controllers/page-controller";

export default class CarElement {
  public element: HTMLElement;
  constructor(
    private page: PageController<Car>,
    private car: Car,
  ) {
    this.page = page;
    this.car = car;
    this.element = document.createElement("div");
    this.element.className = "car-block";
    this.element.id = String(car.id);
    this.element.append(this.renderManageLine());
    this.element.append(this.renderTrackLine());
  }

  private renderManageLine(): HTMLElement {
    const manageLine = document.createElement("div");
    manageLine.className = "manage-line";

    const selectButton = createButton(
      {
        name: "Select",
        class: "manage-button",
      },
      async () => {
        selectCarEvent(this.car.id);
      },
    );
    const removeButton = createButton(
      {
        name: "Remove",
        class: "manage-button",
      },
      async () => {
        await deleteCarEvent(this.car.id);
        await this.page.state.refreshTotalCount();
        this.page.refresh();
      },
    );
    const nameSpan = document.createElement("span");
    nameSpan.textContent = this.car.name;
    nameSpan.className = "car-name";

    manageLine.append(selectButton, removeButton, nameSpan);
    return manageLine;
  }

  private renderTrackLine(): HTMLElement {
    const carLine = document.createElement("div");
    carLine.className = "track-line";

    const startButton = createButton({
      name: "Start",
      class: "car-controls",
    });
    const stopButton = createButton({
      name: "Stop",
      class: "car-controls",
      disabled: true,
    });
    const carPicture = CarElement.renderCarPicture(this.car.color);
    const flag = CarElement.renderTrackFlag();

    carLine.append(startButton, stopButton, carPicture, flag);
    return carLine;
  }

  static renderCarPicture(color: string): HTMLElement {
    const carPicture = document.createElement("div");
    carPicture.className = "car-picture";

    const parser = new DOMParser();
    const carDocument = parser.parseFromString(carSvg, "image/svg+xml");

    const carPictureElement = carDocument.documentElement;
    carPictureElement.setAttribute("width", "100%");
    carPictureElement.setAttribute("height", "auto");
    carPictureElement.setAttribute("fill", color || DEFAULT_CAR_COLOR);
    carPictureElement.setAttribute("title", "Car");
    carPictureElement.classList.add("car-image");

    carPicture.append(carPictureElement);
    return carPicture;
  }

  static renderTrackFlag(): HTMLElement {
    const parser = new DOMParser();
    const flag = document.createElement("div");
    flag.className = "finish-flag";
    const svgDocument = parser.parseFromString(flagSvg, "image/svg+xml");
    const svgElement = svgDocument.documentElement;
    svgElement.setAttribute("fill", "var(--flag-color)");
    svgElement.setAttribute("stroke", "var(--flag-color)");
    svgElement.setAttribute("title", "Flag");
    flag.append(svgElement);
    return flag;
  }
}
