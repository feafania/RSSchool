import "./user-list.css";
import usersStore from "../../../../store/users-store";
import authStore from "../../../../store/auth-store";
import { UserType } from "../../../../types/interfaces";
import messagesStore from "../../../../store/messages-store";
import chatHeader from "../chat-area/chat-header/chat-header";
import chatMessages from "../chat-area/chat-messages/chat-messages";
import chatInputArea from "../chat-area/chat-input-area/chat-input-area";

import searchBar from "./search-button/search-button";

class UserList {
  private users: HTMLUListElement;
  private searchTerm: string = "";
  public selectedUser: string | undefined = undefined;

  constructor() {
    this.users = document.createElement("ul");
    usersStore.subscribe(() => this.updateUsers());
    messagesStore.subscribe(() => this.updateUnreadCount());
  }

  render() {
    const usersListSection = document.createElement("section");
    usersListSection.className = "users-list";

    if (!this.users) {
      this.users = document.createElement("ul");
    }
    this.users.className = "users";

    const searchBarElement = searchBar.render();
    searchBar.searchInput?.addEventListener("input", (event) => {
      this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      this.updateUsers();
    });

    usersListSection.append(searchBarElement, this.users);
    this.updateUsers();
    return usersListSection;
  }

  public reset() {
    this.searchTerm = "";
    this.selectedUser = undefined;
  }

  private updateUsers() {
    if (this.selectedUser && !usersStore.hasUser(this.selectedUser)) {
      setTimeout(() => {
        if (this.selectedUser && !usersStore.hasUser(this.selectedUser)) {
          chatInputArea.cancelEdit();
          this.selectedUser = undefined;
          chatHeader.reset();
          chatMessages.reset();
          chatMessages.render();
        }
      }, 2000);
    }

    const filteredUsers = this.filterUsers();

    this.users.innerHTML = "";

    for (const user of filteredUsers) {
      const li = this.renderUser(user);
      this.users.append(li);
    }

    if (filteredUsers.length === 0) {
      const noResult = document.createElement("li");
      noResult.className = "user user-text user-empty";
      noResult.textContent = "No users found.";
      this.users.append(noResult);
    }
  }

  private filterUsers(): UserType[] {
    const allUsers = [...usersStore.users];
    const currentUser = authStore.user;
    return allUsers
      .filter(
        (user) =>
          user.login !== currentUser?.login &&
          user.login.toLowerCase().includes(this.searchTerm),
      )
      .sort((a, b) => {
        const aOnline = Number(a.isLogined);
        const bOnline = Number(b.isLogined);

        if (aOnline !== bOnline) {
          return bOnline - aOnline;
        }

        return a.login.localeCompare(b.login);
      });
  }

  private renderUser(user: UserType): HTMLLIElement {
    const li = document.createElement("li");
    li.className = "user";
    li.dataset.login = user.login;

    const statusDot = document.createElement("span");
    statusDot.className = "user-status";
    statusDot.classList.add(
      user.isLogined ? "status-active" : "status-inactive",
    );
    const loginText = document.createElement("span");
    loginText.textContent = user.login;
    loginText.className = "user-text";
    li.append(statusDot, loginText);

    const countElement = document.createElement("span");
    countElement.textContent = user.login;
    countElement.className = "unread-count";
    const unreadMessages = messagesStore.countUnreadMessages(user.login);
    if (user.login === this.selectedUser) {
      li.classList.add("selected");
      countElement.classList.add("selected");
      chatHeader.setUsername(user);
    }
    if (unreadMessages > 0) {
      countElement.textContent = String(unreadMessages);
      countElement.style.display = "";
    } else {
      countElement.style.display = "none";
    }
    li.append(countElement);

    li.addEventListener("click", this.updateChatMessages(user));
    return li;
  }

  private updateUnreadCount() {
    const items = this.users.querySelectorAll("li.user");

    for (const li of items) {
      const item = li as HTMLLIElement;
      const login = item.dataset.login;
      if (!login) continue;

      const count =
        login === this.selectedUser && !chatMessages.isUnreadLine
          ? 0
          : messagesStore.countUnreadMessages(login);
      let countElement = li.querySelector(".unread-count") as HTMLSpanElement;

      if (!countElement) {
        countElement = document.createElement("span");
        countElement.className = "unread-count";
        li.append(countElement);
      }

      if (count > 0) {
        countElement.textContent = String(count);
        countElement.style.display = "";
      } else {
        countElement.style.display = "none";
      }
    }
  }

  private updateChatMessages(user: UserType) {
    return () => {
      if (userList.selectedUser) {
        chatInputArea.saveDraft(userList.selectedUser);
      }
      this.selectedUser = user.login;
      chatHeader.setUsername(user);
      chatMessages.render();
      this.updateUsers();
      chatInputArea.restoreDraft(user.login);
      chatInputArea.updateInputState();

      if (chatInputArea.chatInput) {
        chatInputArea.chatInput.focus();
      }
    };
  }
}

const userList = new UserList();
export default userList;
