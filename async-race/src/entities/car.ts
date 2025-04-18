import { CarType } from "../types/interfaces";
import EngineRouter from "../api/engine/router";
import { CAR_START_POSITION } from "../constants";

export default class Car {
  private _data: CarType;
  public isRunning: boolean;
  public position: { progress: number; duration: number };
  private animationStartTime: number | undefined = undefined;
  public finishTime: number | undefined = undefined;
  private startTime: number | undefined = undefined;

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

  async run() {
    if (this.isRunning) {
      return;
    }
    const carBlock = document.querySelector<HTMLElement>(
      `.car-block[data-id="${this.id}"]`,
    );
    await this.startEngine();

    const resetButton =
      document.querySelector<HTMLButtonElement>("#reset-button");
    if (resetButton) {
      resetButton.disabled = false;
    }

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

    const animationPromise = this.animateCar(carPicture, flag);
    await this.driveEngine(carBlock);
    await animationPromise;
  }

  async stop() {
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

  setStartState() {
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
    this.isRunning = true;
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
    this.isRunning = false;
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

          const startRace = this.startTime || startTime;

          this.finishTime =
            this.position.progress === 1 ? currentTime - startRace : undefined;

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
    const startButton = carBlock.querySelector<HTMLButtonElement>(".car-start");
    const stopButton = carBlock.querySelector<HTMLButtonElement>(".car-stop");

    if (!startButton || !stopButton) {
      console.error(`Missing elements inside car block for car ID ${this.id}`);
      return;
    }
    startButton.disabled = this.position.progress === 1 || this.isRunning;
    stopButton.disabled = this.position.progress === 0 && !this.isRunning;
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
