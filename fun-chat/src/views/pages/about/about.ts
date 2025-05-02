import "./about.css";

export async function renderAboutView(): Promise<HTMLElement> {
  const container = document.createElement("section");
  container.id = "about";
  container.className = "view about-view";

  const h2 = document.createElement("h2");
  h2.className = "about-title";
  h2.textContent = "About";

  const text = document.createElement("p");
  text.className = "about-text";
  text.textContent =
    "This application was developed as part of the RSSchool EN JS/FE 2024Q4 course.";

  const link = document.createElement("a");
  link.className = "about-link";
  link.target = "_blank";
  link.href = "https://github.com/feafania";
  link.rel = "noopener noreferrer";
  link.textContent = "Author: Tatsiana Kashko";

  // Увесь парадак
  container.append(h2, text, renderTips(), link);

  return container;
}

function renderTips() {
  const tipsWrapper = document.createElement("div");
  tipsWrapper.className = "tips-wrapper";

  const tipsTitle = document.createElement("p");
  tipsTitle.className = "about-text tip-title";
  tipsTitle.textContent = "Tips:";

  const tipsList = document.createElement("ul");
  tipsList.className = "tips-list";

  const tips = [
    "hover over a message to edit or delete it;",
    "press Ctrl (Cmd) + Enter to add a new line;",
    "press Esc to cancel editing.",
  ];

  for (const tip of tips) {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.append(li);
  }

  tipsWrapper.append(tipsTitle, tipsList);
  return tipsWrapper;
}
