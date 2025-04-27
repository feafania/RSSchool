import { PageType } from "../types/enum";
import LoginView from "../views/pages/login/login";
import { renderMainView } from "../views/pages/chat/chat";
import { renderAboutView } from "../views/pages/about/about";
import Header from "../views/common/sections/header/header";
import authStore from "../store/auth-store";

const PageRouter = {
  currentPage: PageType.login as PageType,
  init() {
    globalThis.addEventListener("popstate", () => this.handleRoute());
    this.handleRoute();
  },

  async handleRoute() {
    const rawPath = location.pathname.slice(1);

    const isValidPage = (Object.values(PageType) as string[]).includes(rawPath);
    const path = isValidPage ? (rawPath as PageType) : undefined;

    let page: PageType;

    if (path === PageType.about) {
      page = path;
    } else {
      const isLoggedIn = Boolean(authStore.user);
      page = isLoggedIn ? PageType.chat : PageType.login;
      if (!path || path !== page) {
        history.replaceState(undefined, "", `/${page}`);
      }
    }

    this.currentPage = page;

    const renderMap = {
      [PageType.login]: LoginView.render.bind(LoginView),
      [PageType.chat]: renderMainView,
      [PageType.about]: renderAboutView,
    };

    const render = renderMap[page];

    if (render) {
      const element = await render();
      const container = document.querySelector("#view-container");
      if (container) {
        container.innerHTML = "";
        container.append(element);
      }
    }

    Header.renderNav();
  },

  navigateTo(path: PageType) {
    history.pushState(undefined, "", `/${path}`);
    this.handleRoute();
  },
};

export default PageRouter;
