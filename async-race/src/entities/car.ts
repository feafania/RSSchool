import { CarType } from "../types/interfaces";
import EngineRouter from "../api/engine/router";
import { CAR_START_POSITION } from "../constants";
import { disableButton } from "../utils/helpers";

export default class Car {
  private _data: CarType;
  private isRunning: boolean;
  private animationStartTime: number | undefined = undefined;
  private startTime: number | undefined = undefined;
  public position: { progress: number; duration: number };
  public finishTime: number | undefined = undefined;

  constructor(data: CarType) {
    this._data = data;
    this.isRunning = false;
    this.position = { progress: 0, duration: 0 };
  }

  get id() {
    return this._data.id;
  }

  get name() {
    return this._data.name;
  }

  set name(value: string) {
    this._data.name = value;
  }

  get color() {
    return this._data.color;
  }

  set color(value: string) {
    this._data.color = value;
  }

  update(data: CarType) {
    this._data = data;
  }

  async run() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    await this.startEngine();

    const carBlock = document.querySelector<HTMLElement>(
      `.car-block[data-id="${this.id}"]`,
    );

    if (!carBlock) {
      console.error(`Car block with ID ${this.id} not found.`);
      return;
    }
    const { carPicture, flag } = this.selectCarElements(carBlock);
    if (!carPicture || !flag) {
      console.error(`Missing elements inside car block for car ID ${this.id}`);
      return;
    }
    this.setButtonState(carBlock);
    // const finishX = flag.offsetLeft + flag.offsetWidth;
    // carPicture.style.transition = `left ${time}ms linear`;carPicture.style.left = `${finishX}px`;
    carPicture.style.transition = "none";
    this.animateCar(carPicture, flag); // const animationPromise =
    await this.driveEngine(carBlock);
    // await animationPromise;
  }

  async stop() {
    this.isRunning = false;

    await this.stopEngine();

    const carBlock = document.querySelector<HTMLElement>(
      `.car-block[data-id="${this.id}"]`,
    );

    if (!carBlock) {
      console.error(`Car block with ID ${this.id} not found.`);
      return;
    }
    const { carPicture } = this.selectCarElements(carBlock);

    if (carPicture) {
      this.stopAnimation(carPicture, CAR_START_POSITION);
    }
    this.setButtonState(carBlock);
  }

  async setStartState() {
    const carBlock = document.querySelector<HTMLElement>(
      `.car-block[data-id="${this.id}"]`,
    );

    if (!carBlock) {
      console.error(`Car block with ID ${this.id} not found.`);
      return;
    }
    const { carPicture, flag } = this.selectCarElements(carBlock);
    if (!carPicture || !flag) {
      console.error(`Missing elements inside car block for car ID ${this.id}`);
      return;
    }
    carPicture.style.transition = "none";
    this.setCurrentCarPosition(carPicture, flag, CAR_START_POSITION);
    this.setButtonState(carBlock);
    if (this.isRunning && this.position.progress < 1) {
      this.animateCar(carPicture, flag);
    }
  }

  private async startEngine() {
    const engineData = await EngineRouter.start(this.id);
    if (!engineData) return;
    const { velocity, distance } = engineData;
    this.position.duration = distance / velocity;
    this.position.progress = 0;
    this.finishTime = undefined;
    if (this.startTime === undefined) {
      this.startTime = performance.now();
    }
  }

  private async stopEngine() {
    await EngineRouter.stop(this.id);
    this.position.progress = 0;
    this.position.duration = 0;
    this.finishTime = undefined;
    this.startTime = undefined;
  }

  private async driveEngine(carBlock: HTMLElement) {
    const driveResponse = await EngineRouter.drive(this.id);
    if (driveResponse.broke) {
      // const brokenPosition = Number.parseFloat(globalThis.getComputedStyle(carPicture).left);
      // this.stopAnimation(carPicture, brokenPosition);
      this.isRunning = false;
      this.setButtonState(carBlock);
    }
  }

  private animateCar(element: HTMLElement, flag: HTMLElement): Promise<void> {
    const startX =
      Number.parseFloat(getComputedStyle(element).left) || CAR_START_POSITION;
    const startTime =
      this.animationStartTime ??
      performance.now() - this.position.progress * this.position.duration;
    this.animationStartTime = startTime;

    return new Promise((resolve) => {
      const animate = (currentTime: number) => {
        const timeElapsed = currentTime - startTime;
        if (this.position.duration) {
          this.position.progress = Math.min(
            timeElapsed / this.position.duration,
            1,
          );
        }
        this.setCurrentCarPosition(element, flag, startX);

        if (this.position.progress < 1 && this.isRunning) {
          requestAnimationFrame(animate);
        } else {
          this.isRunning = false;
          this.animationStartTime = undefined;

          // const startRace = this.startTime || startTime;

          this.finishTime =
            this.position.progress === 1 ? currentTime - startTime : undefined; // - startRace

          this.setButtonState(element);
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  private setCurrentCarPosition(
    element: HTMLElement,
    flag: HTMLElement,
    startX: number,
  ) {
    if (element && flag) {
      const distance = flag.offsetLeft + flag.offsetWidth - startX;
      const currentX = startX + distance * this.position.progress;
      element.style.left = `${currentX}px`;
    }
  }

  setButtonState(carBlock: HTMLElement) {
    disableButton(
      carBlock,
      ".car-start",
      this.position.progress !== 0 || this.isRunning,
    );
    disableButton(
      carBlock,
      ".car-stop",
      this.position.progress === 0 && !this.isRunning,
    );
    // startButton.disabled = this.position.progress === 1 || this.isRunning;
  }

  private selectCarElements(carBlock: HTMLElement): {
    carPicture: HTMLElement | null;
    flag: HTMLElement | null;
  } {
    const carPicture = carBlock.querySelector<HTMLElement>(".car-picture");
    const flag = carBlock.querySelector<HTMLElement>(".finish-flag");

    return { carPicture, flag };
  }

  private stopAnimation(element: HTMLElement, position: number) {
    element.style.transition = "left 0.3s ease";
    //css-animation
    // element.style.transition = "none";
    element.style.left = `${position}px`;
    // requestAnimationFrame(() => {
    //   element.style.transition = "left 0.3s ease";
    // });
  }
}
