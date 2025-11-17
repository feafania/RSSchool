import { ValidationType } from "../types/types";

import { SETTINGS } from "./settings";

export const VIEW_CONTAINER_NAME = "view-container";

export const API_SETTINGS = {
  PORT: 4000,
  BASE_URL: "ws://127.0.0.1",
};

const isGitHubPages = location.hostname === "rolling-scopes-school.github.io";

export const BASE_PATH = isGitHubPages ? "/feafania-JSFEEN2024Q4/fun-chat" : "";

export const VALIDATION = {
  username: {
    pattern: /^[a-zA-Z0-9]{4,30}$/,
    message: SETTINGS.label.login.validateUsername,
  } as ValidationType,
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/,
    message: SETTINGS.label.login.validatePassword,
  } as ValidationType,
};
