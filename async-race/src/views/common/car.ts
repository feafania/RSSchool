import carSvg from "../../assets/svg/car-sideways.svg";
import flagSvg from "../../assets/svg/finish-flag.svg";
import "../../styles/car.css";
import { DEFAULT_CAR_COLOR } from "../../constants";

import { createButton } from "./button";

function renderManageLine(index: number): HTMLElement {
  const manageLine = document.createElement("div");
  manageLine.className = "manage-line";

  const selectButton = createButton({
    name: "Select",
    class: "manage-button",
  });
  const removeButton = createButton({
    name: "Remove",
    class: "manage-button",
  });
  const nameSpan = document.createElement("span");
  nameSpan.textContent = `Car ${index + 1}`;
  nameSpan.className = "car-name";

  manageLine.append(selectButton, removeButton, nameSpan);
  return manageLine;
}

function renderTrackLine(): HTMLElement {
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
  const car = document.createElement("div");
  car.className = "car-picture";

  const parser = new DOMParser();
  const carDocument = parser.parseFromString(carSvg, "image/svg+xml");

  const carElement = carDocument.documentElement;
  carElement.setAttribute("width", "100%");
  carElement.setAttribute("height", "auto");
  carElement.setAttribute("fill", DEFAULT_CAR_COLOR);
  carElement.setAttribute("title", "Car");
  carElement.classList.add("car-image");

  car.append(carElement);

  const flag = document.createElement("div");
  flag.className = "finish-flag";
  const svgDocument = parser.parseFromString(flagSvg, "image/svg+xml");
  const svgElement = svgDocument.documentElement;
  svgElement.setAttribute("fill", "var(--flag-color)");
  svgElement.setAttribute("stroke", "var(--flag-color)");
  carElement.setAttribute("title", "Flag");
  flag.append(svgElement);

  carLine.append(startButton, stopButton, car, flag);
  return carLine;
}

export function renderCar(index: number) {
  const carBlock = document.createElement("div");
  carBlock.className = "car-block";
  carBlock.append(renderManageLine(index));
  carBlock.append(renderTrackLine());
  return carBlock;
}
