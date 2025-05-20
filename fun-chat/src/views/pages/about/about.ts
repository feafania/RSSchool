import "./about.css";
import createGithubLinkElement from "../../common/elements/github-link";
import { SETTINGS } from "../../../constants/settings";

export async function renderAboutView(): Promise<HTMLElement> {
  const container = document.createElement("section");
  container.id = "about";
  container.className = "view about-view";

  const h2 = document.createElement("h2");
  h2.className = "about-title";
  h2.textContent = SETTINGS.label.about.title;

  const text = document.createElement("p");
  text.className = "about-text";
  text.textContent = SETTINGS.label.about.text;

  const link = createGithubLinkElement("about-link");
  link.textContent = SETTINGS.label.about.link;

  container.append(h2, text, renderTips(), link);

  return container;
}

function renderTips() {
  const tipsWrapper = document.createElement("div");
  tipsWrapper.className = "tips-wrapper";

  const tipsTitle = document.createElement("p");
  tipsTitle.className = "about-text tip-title";
  tipsTitle.textContent = SETTINGS.label.about.tipsTitle;

  const tipsList = document.createElement("ul");
  tipsList.className = "tips-list";

  const tips = SETTINGS.label.about.tips;

  for (const tip of tips) {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.append(li);
  }

  tipsWrapper.append(tipsTitle, tipsList);
  return tipsWrapper;
}
