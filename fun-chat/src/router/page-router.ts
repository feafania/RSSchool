import { PageType } from "../types/enum";
import LoginView from "../views/pages/login/login";
import { renderAboutView } from "../views/pages/about/about";
import Header from "../views/common/sections/header/header";
import authStore from "../store/auth-store";
import ChatView from "../views/pages/chat/chat";
import { BASE_PATH } from "../constants";

const PageRouter = {
  currentPage: PageType.login as PageType,
  init() {
    globalThis.addEventListener("popstate", () => this.handleRoute());
    globalThis.addEventListener("hashchange", () => this.handleRoute());
    this.handleRoute();
  },

  getPathFromUrl(): string {
    const hash = location.hash.slice(1);
    return hash || PageType.login;
  },

  async handleRoute() {
    const rawPath = this.getPathFromUrl();

    const isValidPage = (Object.values(PageType) as string[]).includes(rawPath);
    const path = isValidPage ? (rawPath as PageType) : undefined;

    let page: PageType;

    if (path === PageType.about) {
      page = path;
    } else {
      const isLoggedIn = Boolean(authStore.user);
      page = isLoggedIn ? PageType.chat : PageType.login;
      if (!path || path !== page) {
        location.replace(`${BASE_PATH}/#${page}`);
        return;
      }
    }

    this.currentPage = page;

    const renderMap = {
      [PageType.login]: LoginView.render.bind(LoginView),
      [PageType.chat]: ChatView.renderChat.bind(ChatView),
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
    location.hash = `#${path}`;
  },
};

export default PageRouter;
