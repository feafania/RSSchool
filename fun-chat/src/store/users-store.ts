import { UserType } from "../types/interfaces";
import { Listener } from "../types/types";
import { wsClient } from "../api/websocket";

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

  async addUser(user: UserType) {
    this._users.set(user.login, user);
    await wsClient.getMessageHistory(user.login);
    this.notify();
  }

  async setUsers(users: UserType[]) {
    const historyPromises = users.map(async (user) => {
      this._users.set(user.login, user);
      await wsClient.getMessageHistory(user.login);
    });

    await Promise.all(historyPromises);
    this.notify();
  }

  clear() {
    this._users.clear();
    this.notify();
  }

  hasUser(login: string): boolean {
    return this._users.has(login);
  }

  private notify() {
    for (const listener of this.listeners) listener();
  }
}

const usersStore = new UsersStore();

export default usersStore;
