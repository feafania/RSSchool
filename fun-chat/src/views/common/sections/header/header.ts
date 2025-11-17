import "./header.css";
import { NavType } from "../../../../types/interfaces";
import { PageType } from "../../../../types/enum";
import PageRouter from "../../../../router/page-router";
import authStore from "../../../../store/auth-store";
import { wsClient } from "../../../../api/websocket";
import userList from "../../../pages/chat/user-list/user-list";
import chatInputArea from "../../../pages/chat/chat-area/chat-input-area/chat-input-area";
import { SETTINGS } from "../../../../constants/settings";

import renderHeaderUsername from "./header-user-update";

const Header = {
  nav: document.createElement("nav") as HTMLElement,

  create(): HTMLElement {
    const header = document.createElement("header");
    header.className = "header";

    const title = document.createElement("h1");
    title.className = "title";
    title.textContent = SETTINGS.label.title;

    const username = document.createElement("h1");
    username.className = "header-username";
    this.nav.className = "nav";

    header.append(title, username, this.nav);
    renderHeaderUsername();
    this.renderNav();

    return header;
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
        link.addEventListener("click", this.onClick(label, page));
      }
      li.append(link);
      ul.append(li);
    }
    this.nav.append(ul);
  },

  getNavLinks(): NavType[] {
    const isLoggedIn = Boolean(authStore.user);

    const links: NavType[] = [
      {
        label: SETTINGS.label.nav.signIn,
        page: PageType.login,
        visible: !isLoggedIn,
      },
      {
        label: SETTINGS.label.nav.chat,
        page: PageType.chat,
        visible: isLoggedIn,
      },
      { label: SETTINGS.label.nav.about, page: PageType.about, visible: true },
      {
        label: SETTINGS.label.nav.signOut,
        page: PageType.login,
        visible: isLoggedIn,
      },
    ];
    return links;
  },

  onClick(label: string, page: PageType) {
    return async () => {
      if (label === SETTINGS.label.nav.signOut && authStore.user) {
        try {
          await wsClient.logout(authStore.user);
        } catch (error) {
          wsClient.close();
          console.error("Logout error:", error);
        }
      } else {
        chatInputArea.saveDraft(userList.selectedUser);
        PageRouter.navigateTo(page);
      }
    };
  },
};

export default Header;
