import "./footer.css";
import logoUrl from "../../../../assets/svg/rs-school-logo.svg";
import createGithubLinkElement from "../../elements/github-link";

function createGithubLink() {
  const githubElement = document.createElement("div");
  githubElement.className = "github";

  const githubLink = createGithubLinkElement("github-link");
  githubElement.append(githubLink);

  const githubFa = document.createElement("i");
  githubFa.className = "fab fa-github github-logo";
  const githubName = document.createElement("span");
  githubName.textContent = "feafania";
  githubLink.append(githubFa, githubName);

  return githubElement;
}

function createRSSchoolLink() {
  const rsschoolElement = document.createElement("div");
  rsschoolElement.className = "rsschool";

  const rsschoolLink = document.createElement("a");
  rsschoolLink.className = "rsschool-link";
  rsschoolLink.target = "_blank";
  rsschoolLink.href = "https://rs.school/courses/javascript";
  rsschoolLink.rel = "noopener noreferrer";
  rsschoolElement.append(rsschoolLink);

  const parser = new DOMParser();
  const rsschoolDocument = parser.parseFromString(logoUrl, "image/svg+xml");

  const rsschoolImg = rsschoolDocument.documentElement;
  rsschoolImg.setAttribute("width", "100%");
  rsschoolImg.setAttribute("height", "auto");
  rsschoolImg.classList.add("rsschool-logo");
  rsschoolImg.setAttribute("title", "RS School");

  const rsschoolName = document.createElement("span");
  rsschoolName.className = "rsschool-name";
  rsschoolName.textContent = "Rolling Scopes School";
  rsschoolLink.append(rsschoolImg, rsschoolName);

  return rsschoolElement;
}

export default function createFooter(): HTMLElement {
  const footer = document.createElement("footer");
  footer.className = "footer";

  footer.append(createGithubLink());

  const text = document.createElement("p");
  text.textContent = "2025";
  footer.append(text);

  footer.append(createRSSchoolLink());

  return footer;
}
