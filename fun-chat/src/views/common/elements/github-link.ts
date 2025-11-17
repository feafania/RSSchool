export default function createGithubLinkElement(
  className: string,
): HTMLAnchorElement {
  const githubLink = document.createElement("a");
  githubLink.className = className;
  githubLink.target = "_blank";
  githubLink.href = "https://github.com/feafania";
  githubLink.rel = "noopener noreferrer";
  return githubLink;
}
