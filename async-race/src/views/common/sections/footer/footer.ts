import "./footer.css";
import logoUrl from "../../../../assets/svg/rs-school-logo.svg";

function createGithubLink() {
  const githubElement = document.createElement("div");
  githubElement.className = "github";

  const githubLink = document.createElement("a");
  githubLink.className = "github-link";
  githubLink.target = "_blank";
  githubLink.href = "https://github.com/feafania";
  githubLink.rel = "noopener noreferrer";
  githubElement.append(githubLink);

  const githubFa = document.createElement("i");
  githubFa.className = "fab fa-github section-contacts-logo";
  const githubName = document.createElement("span");
  githubName.textContent = "feafania";
  githubLink.append(githubFa, githubName);

  return githubElement;
}

function createRSSchoolLink() {
  const rsschoolElement = document.createElement("div");
  rsschoolElement.className = "rsschool";

  const rsschoolLink = document.createElement("a");
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
  rsschoolLink.append(rsschoolImg);

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
