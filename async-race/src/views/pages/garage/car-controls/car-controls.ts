import "./car-controls.css";
import { ControlConfig } from "../../../../types/interfaces";
import createInput from "../../../common/elements/input/input";
import createColorPicker from "../../../common/elements/color-selection/color-selection";
import createButton from "../../../common/elements/button/button";
import createCarEvent from "../../../../controllers/car-controller/create-car-controller";
import { disableButton, getState } from "../../../../utils/helpers";
import updateCarEvent from "../../../../controllers/car-controller/update-car-controller";
import generateCarsEvent from "../../../../controllers/car-controller/generate-cars-controller";
import PageController from "../../../../controllers/page-controller";
import Car from "../../../../entities/car";
import resetCarsEvent from "../../../../controllers/car-controller/reset-cars-controller";
import raceCarsEvent from "../../../../controllers/car-controller/race-cars-controller";
import GarageState from "../../../../entities/garage";
import RaceState from "../../../../entities/race";

export default class CarControls {
  public element: HTMLElement;
  public pageController: PageController<Car>;

  constructor(pageController: PageController<Car>) {
    this.pageController = pageController;

    this.element = document.createElement("div");
    this.element.className = "controls-wrapper";
    this.element.append(
      this.renderCarSettingsControls(),
      this.renderTrackControls(),
    );
  }

  private renderSettingsGroup(
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

  private renderCarCreate(): HTMLDivElement {
    return this.renderSettingsGroup(
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
      async () => {
        await createCarEvent();
        await this.refresh();
      },
    );
  }

  private renderCarUpdate(): HTMLDivElement {
    const updatedCarId = getState("updatedCarId");
    return this.renderSettingsGroup(
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
      async () => {
        await updateCarEvent();
        await this.refresh();
      },
    );
  }

  private renderCarSettingsControls() {
    const carSettings = document.createElement("div");
    carSettings.className = "car-settings";
    const carCreateGroup = this.renderCarCreate();
    const carUpdateGroup = this.renderCarUpdate();
    carSettings.append(carCreateGroup, carUpdateGroup);
    return carSettings;
  }

  private renderTrackControls() {
    const trackControls = document.createElement("div");
    trackControls.className = "track-controls";
    const raceButton = createButton(
      {
        name: "Race",
        id: "race-button",
        class: "car-controls-button",
      },
      async () => {
        await raceCarsEvent();
      },
    );
    const resetButton = createButton(
      {
        name: "Reset",
        id: "reset-button",
        class: "car-controls-button",
      },
      async () => {
        await resetCarsEvent();
      },
    );
    const generateButton = createButton(
      {
        name: "Generate cars",
        id: "generate-button",
        class: "car-controls-button",
      },
      async () => {
        await generateCarsEvent();
        await this.refresh();
      },
    );
    trackControls.append(raceButton, resetButton, generateButton);
    return trackControls;
  }

  async refresh() {
    await this.pageController.refresh();
  }

  static checkState() {
    const carBlocks = document.querySelectorAll<HTMLElement>(".car-block");
    let startState = true;
    for (const carBlock of carBlocks) {
      const id = Number(carBlock.dataset.id);
      const car = GarageState.getItem(id);
      if (!car) continue;
      if (car.position.progress > 0) {
        startState = false;
      }
    }
    disableButton(document, "#race-button", !startState || RaceState.isRacing);
    disableButton(document, "#reset-button", startState);
  }
}
