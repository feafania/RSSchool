import "./header.css";
import { getState } from "../../../../utils/helpers";
import { NavType } from "../../../../types/interfaces";
import { PageType } from "../../../../types/enum";
import PageRouter from "../../../../router/page-router";

const Header = {
  nav: document.createElement("nav") as HTMLElement,

  create(): HTMLElement {
    const header = document.createElement("header");
    header.className = "header";

    const title = document.createElement("h1");
    title.className = "title";
    title.textContent = "Fun Chat";
    header.append(title);

    this.nav.className = "nav";
    header.append(this.nav);
    this.replaceNav();

    return header;
  },

  replaceNav() {
    this.renderNav();
    const nav = document.querySelector(".nav");
    if (nav) {
      nav.replaceWith(this.nav);
    }
  },

  renderNav() {
    this.nav.innerHTML = "";
    const links = this.getNavLinks();

    const ul = document.createElement("ul");
    ul.className = "nav-list";

    for (const { label, page, visible } of links) {
      if (!visible) continue;

      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = label;
      link.href = "javascript:void(0)";
      link.className = "nav-link";

      const isCurrent = PageRouter.currentPage === page;

      if (isCurrent) {
        link.classList.add("active");
      } else {
        link.addEventListener("click", () => {
          if (label === "Sign Out") {
            localStorage.removeItem("token");
          }
          PageRouter.navigateTo(page);
        });
      }
      li.append(link);
      ul.append(li);
    }
    this.nav.append(ul);
  },

  getNavLinks(): NavType[] {
    const isLoggedIn = Boolean(getState("token"));

    const links: NavType[] = [
      { label: "Sign In", page: PageType.login, visible: !isLoggedIn },
      { label: "Chat", page: PageType.chat, visible: isLoggedIn },
      { label: "About", page: PageType.about, visible: true },
      { label: "Sign Out", page: PageType.login, visible: isLoggedIn },
    ];
    return links;
  },
};

export default Header;
