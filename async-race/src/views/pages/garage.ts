import { PageType } from "../../types/enum";
import "../../styles/garage.css";
import { createButton } from "../common/button";
import { CARS_PER_PAGE } from "../../constants";
import { renderCar } from "../common/car";
import { createInput } from "../common/input";
import { createColorPicker } from "../common/color-selection";
import { ControlConfig } from "../../types/interfaces";

const currentPage = 1;
const totalCars = 0;
// let selectedCarId: number | null = null;

function renderSettingsGroup(
  group: string,
  inputElement: ControlConfig,
  colorPickerElement: ControlConfig,
  buttonElement: ControlConfig,
): HTMLDivElement {
  const groupElement = document.createElement("div");
  groupElement.className = group;

  const brandInput = createInput(inputElement);
  const colorPicker = createColorPicker(colorPickerElement);
  const button = createButton(buttonElement);

  groupElement.append(brandInput, colorPicker, button);

  return groupElement;
}

function renderCarCreate(): HTMLDivElement {
  return renderSettingsGroup(
    "car-create",
    {
      name: "",
      id: "create-brand-select",
      class: "brand-select",
    },
    {
      id: "create-car-color",
      class: "color-select",
    },
    {
      name: "Create",
      id: "create-car-button",
      class: "car-controls-button",
    },
  );
}

function renderCarUpdate(): HTMLDivElement {
  return renderSettingsGroup(
    "car-update",
    {
      name: "",
      id: "update-brand-select",
      class: "brand-select",
      disabled: true,
    },
    {
      id: "update-car-color",
      class: "color-select",
      disabled: true,
    },
    {
      name: "Update",
      id: "update-car-button",
      class: "car-controls-button",
      disabled: true,
    },
  );
}

function renderCarSettingsControls() {
  const carSettings = document.createElement("div");
  carSettings.className = "car-settings";
  const carCreateGroup = renderCarCreate();
  const carUpdateGroup = renderCarUpdate();
  carSettings.append(carCreateGroup, carUpdateGroup);
  return carSettings;
}

function renderTrackControls() {
  const trackControls = document.createElement("div");
  trackControls.className = "track-controls";
  const raceButton = createButton({
    name: "Race",
    id: "race-button",
    class: "car-controls-button",
  });
  const resetButton = createButton({
    name: "Reset",
    id: "reset-button",
    class: "car-controls-button",
  });
  const generateButton = createButton({
    name: "Generate cars",
    id: "generate-button",
    class: "car-controls-button",
  });
  trackControls.append(raceButton, resetButton, generateButton);
  return trackControls;
}

function renderCarControls() {
  const controlsWrapper = document.createElement("div");
  controlsWrapper.className = "controls-wrapper";

  controlsWrapper.append(renderCarSettingsControls(), renderTrackControls());
  return controlsWrapper;
}

export function renderGarageView(): HTMLElement {
  const element = document.createElement("div");
  element.className = PageType.Garage + "-view";

  const title = document.createElement("h2");
  title.textContent = `Garage (${totalCars})`;
  title.className = "garage-title";
  element.append(title);

  const pagination = document.createElement("div");
  pagination.className = "pagination";
  const pageInfo = document.createElement("p");
  pageInfo.textContent = `Page #${currentPage}`;
  pageInfo.className = "page-title";
  pagination.append(pageInfo);
  const previousButton = createButton({
    name: "Previous",
    class: "pagination-button",
  });
  const nextButton = createButton({
    name: "Next",
    class: "pagination-button",
  });
  pagination.append(previousButton, nextButton);
  element.append(pagination);

  element.append(renderCarControls());

  const garageList = document.createElement("div");
  garageList.className = "garage-list";

  for (let index = 0; index < CARS_PER_PAGE; index++) {
    garageList.append(renderCar(index));
  }
  element.append(garageList);

  return element;
}
