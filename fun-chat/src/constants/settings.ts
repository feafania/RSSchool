import { LanguageCode } from "../types/types";

import translations from "./interfaces";

const defaultLang: LanguageCode = "en";

export const SETTINGS = {
  currentLang: defaultLang,
  get label() {
    return translations[this.currentLang];
  },
  setLang(lang: LanguageCode) {
    this.currentLang = lang;
    localStorage.setItem("lang", lang);
  },
  lineHeight: 20,
  paddingY: 16,
  maxHeightLines: 3,
};
