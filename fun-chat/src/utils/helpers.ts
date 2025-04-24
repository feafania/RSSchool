import { StorageItem } from "../types/interfaces";
import { HttpStatusType } from "../types/types";
import { API_SETTINGS } from "../constants";

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

export function saveLocalState(object: StorageItem) {
  localStorage.setItem(object.key, object.value);
}

export function getLocalState(key: string): string | null {
  return localStorage.getItem(key);
}

export function ErrorHandler(
  error: Response | Error,
  errorCode: HttpStatusType,
  errorMessage: string,
  otherMessage: string,
  handler: (message: string) => void,
): void {
  if (error instanceof Response && error.status === errorCode) {
    handler(errorMessage);
  } else if (
    error instanceof Error &&
    error.message.includes(errorCode.toString())
  ) {
    handler(errorMessage);
  } else {
    handler(otherMessage);
  }
}

export function buildUrl(path: string): string {
  return `${API_SETTINGS.BASE_URL}:${API_SETTINGS.PORT}/${path}`;
}

export function disableButton(
  element: ParentNode,
  selector: string,
  isDisabled: boolean,
) {
  const buttons = element.querySelectorAll<HTMLButtonElement>(selector);
  for (const button of buttons) {
    button.disabled = isDisabled;
  }
}
