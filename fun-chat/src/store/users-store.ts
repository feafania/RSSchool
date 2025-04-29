import { UserType } from "../types/interfaces";
import { Listener } from "../types/types";

class UsersStore {
  private _users: Map<string, UserType> = new Map();
  private listeners: Set<Listener> = new Set();

  get users() {
    return [...this._users.values()];
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener: Listener) {
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
