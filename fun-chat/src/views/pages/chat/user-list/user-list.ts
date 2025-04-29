import "./user-list.css";
import usersStore from "../../../../store/users-store";
import authStore from "../../../../store/auth-store";
import { UserType } from "../../../../types/interfaces";
import chatHeader from "../chat-area/chat-header/chat-header";

import searchBar from "./search-button/search-button";

class UserList {
  private users: HTMLUListElement;
  private searchTerm: string = "";
  private selectedUser: string | undefined = undefined;

  constructor() {
    this.users = document.createElement("ul");
    usersStore.subscribe(() => this.updateUsers());
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

  private updateUsers() {
    const filteredUsers = this.filterUsers();

    this.users.innerHTML = "";

    for (const user of filteredUsers) {
      const li = document.createElement("li");
      li.className = "user";

      const statusDot = document.createElement("span");
      statusDot.className = "user-status";
      statusDot.classList.add(
        user.isLogined ? "status-active" : "status-inactive",
      );

      const loginText = document.createElement("span");
      loginText.textContent = user.login;
      loginText.className = "user-text";

      li.append(statusDot, loginText);
      li.addEventListener("click", () => {
        this.selectedUser = user.login;
        chatHeader.setUsername(user);
        this.updateUsers();
      });

      if (user.login === this.selectedUser) {
        li.classList.add("selected");
      }
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
        const aIsLogined = Number(a.isLogined);
        const bIsLogined = Number(b.isLogined);
        if (bIsLogined > aIsLogined) {
          return bIsLogined - aIsLogined;
        } else if (bIsLogined < aIsLogined) {
          return aIsLogined - bIsLogined;
        }
        return a.login.localeCompare(b.login);
      });
  }
}

const userList = new UserList();
export default userList;
