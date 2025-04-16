import { CarBrand, CarModel } from "../types/enum";
import { StorageItem } from "../types/interfaces";
import { HTTP_STATUSES } from "../constants";
import showModalMessage from "../views/common/elements/modal-window/modal-window";

export const getRandomColor = (): string =>
  `#${Math.floor(Math.random() * 16_777_215)
    .toString(16)
    .padStart(6, "0")}`;

export const getRandomName = (): string => {
  const brands = Object.values(CarBrand);
  const models = Object.values(CarModel);
  const carBrand = `${brands[Math.floor(Math.random() * brands.length)]}`;
  const carModel = `${models[Math.floor(Math.random() * models.length)]}`;
  return `${carBrand} ${carModel}`;
};

export function capitalizeString(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function saveState(object: StorageItem) {
  sessionStorage.setItem(object.key, object.value);
}

export function getState(key: string): string | null {
  return sessionStorage.getItem(key);
}

export function deleteState(key: string) {
  return sessionStorage.removeItem(key);
}

export function notFoundErrorHandler(
  error: Response | Error,
  notFoundMessage: string,
  otherMessage: string,
): void {
  if (
    error instanceof Response &&
    error.status === HTTP_STATUSES.NOT_FOUND_404
  ) {
    showModalMessage(notFoundMessage);
  } else if (
    error instanceof Error &&
    error.message.includes(HTTP_STATUSES.NOT_FOUND_404.toString())
  ) {
    showModalMessage(notFoundMessage);
  } else {
    showModalMessage(otherMessage);
  }
}
