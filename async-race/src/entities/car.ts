import { CarType } from "../types/interfaces";

export default class Car {
  private _data: CarType;
  public isRunning: boolean;

  constructor(data: CarType) {
    this._data = data;
    this.isRunning = false;
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

  save(car: CarType) {
    Object.assign(this, car);
  }

  run() {
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }
}
