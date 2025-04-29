import { UserType } from "../types/interfaces";
import { UsersListener } from "../types/types";

class UsersStore {
  private _users: Map<string, UserType> = new Map();
  private listeners: Set<UsersListener> = new Set();

  get users() {
    return [...this._users.values()];
  }

  subscribe(listener: UsersListener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener: UsersListener) {
    this.listeners.delete(listener);
  }

  private notify() {
    for (const listener of this.listeners) listener();
  }

  addUser(user: UserType) {
    this._users.set(user.login, user);
    this.notify();
  }

  setUsers(users: UserType[]) {
    for (const user of users) this._users.set(user.login, user);
    this.notify();
  }

  clear() {
    this._users.clear();
    this.notify();
  }
}

const usersStore = new UsersStore();

export default usersStore;
