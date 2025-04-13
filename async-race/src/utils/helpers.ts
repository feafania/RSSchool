import { CarBrand, CarModel } from "../types/enum";
import { StorageItem } from "../types/interfaces";

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
