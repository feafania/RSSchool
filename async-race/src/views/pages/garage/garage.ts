import { PageType } from "../../../types/enum";
import "./garage.css";
import createButton from "../../common/elements/button/button";
import createInput from "../../common/elements/input/input";
import createColorPicker from "../../common/elements/color-selection/color-selection";
import { ControlConfig } from "../../../types/interfaces";
import createPagination from "../../common/elements/pagination/pagination";
import GarageState from "../../../entities/garage";
import loadAndRenderCars from "../../../controllers/garage-controller";
import refreshTitle from "../../../controllers/title-controllers";
import createCarEvent from "../../../controllers/car-controller/create-car-controller";
import GenerateCarsEvent from "../../../controllers/car-controller/generate-cars-controller";
import updateCarEvent from "../../../controllers/car-controller/update-car-controller";
import { getState } from "../../../utils/helpers";

function renderSettingsGroup(
  group: string,
  inputElement: ControlConfig,
  colorPickerElement: ControlConfig,
  buttonElement: ControlConfig,
  onClick: () => void,
): HTMLDivElement {
  const groupElement = document.createElement("div");
  groupElement.className = group;

  const brandInput = createInput(inputElement);
  const colorPicker = createColorPicker(colorPickerElement);
  const button = createButton(buttonElement, onClick);

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
    async () => await createCarEvent(),
  );
}

function renderCarUpdate(): HTMLDivElement {
  const updatedCarId = getState("updatedCarId");
  return renderSettingsGroup(
    "car-update",
    {
      name: "",
      id: "update-brand-select",
      class: "brand-select",
      disabled: !updatedCarId,
    },
    {
      id: "update-car-color",
      class: "color-select",
      disabled: !updatedCarId,
    },
    {
      name: "Update",
      id: "update-car-button",
      class: "car-controls-button",
      disabled: !updatedCarId,
    },
    async () => await updateCarEvent(),
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
  const generateButton = createButton(
    {
      name: "Generate cars",
      id: "generate-button",
      class: "car-controls-button",
    },
    async () => await GenerateCarsEvent(),
  );
  trackControls.append(raceButton, resetButton, generateButton);
  return trackControls;
}

function renderCarControls() {
  const controlsWrapper = document.createElement("div");
  controlsWrapper.className = "controls-wrapper";

  controlsWrapper.append(renderCarSettingsControls(), renderTrackControls());
  return controlsWrapper;
}

let pagination: HTMLElement;
let title: HTMLHeadingElement;
let garageList: HTMLDivElement;

const rerenderCars = async () => {
  await refreshTitle(PageType.Garage, title);
  garageList.innerHTML = "";
  await loadAndRenderCars(garageList);

  const newPagination = createPagination(GarageState, rerenderCars);
  pagination.replaceWith(newPagination);
  pagination = newPagination;
};

export default async function renderGarageView(): Promise<HTMLElement> {
  const element = document.createElement("div");
  element.className = PageType.Garage + "-view";

  title = document.createElement("h2");
  title.className = "garage-title";
  element.append(title);

  garageList = document.createElement("div");
  garageList.className = "garage-list";

  pagination = createPagination(GarageState, rerenderCars);
  element.append(pagination);

  element.append(renderCarControls());
  element.append(garageList);
  await rerenderCars();

  return element;
}
