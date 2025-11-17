import { ChatMessage } from "../types/interfaces";
import { Listener, StatusKeys } from "../types/types";

import authStore from "./auth-store";

class MessagesStore {
  private _messages: Map<string, ChatMessage[]> = new Map();
  private _idIndex: Map<string, string> = new Map();
  private listeners: Set<Listener> = new Set();

  get messages() {
    return this._messages;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners.delete(listener);
  }

  getUserMessages(login: string): ChatMessage[] {
    return this._messages.get(login) ?? [];
  }

  addMessage(login: string, message: ChatMessage) {
    const existingMessages = this._messages.get(login) ?? [];

    const alreadyExists = existingMessages.some((m) => m.id === message.id);
    if (!alreadyExists) {
      existingMessages.push(message);
      this._messages.set(login, existingMessages);
      this._idIndex.set(message.id, login);
      this.notify();
    }
  }

  setUserMessages(login: string, messages: ChatMessage[]) {
    const oldMessages = this._messages.get(login) ?? [];
    for (const message of oldMessages) {
      this._idIndex.delete(message.id);
    }

    this._messages.set(login, messages);
    for (const message of messages) {
      this._idIndex.set(message.id, login);
    }

    this.notify();
  }

  setHistoryMessages(messages: ChatMessage[]) {
    if (messages.length > 0) {
      const login =
        messages[0].from === authStore.user?.login
          ? messages[0].to
          : messages[0].from;
      if (login) {
        this.setUserMessages(login, messages);
      }
    }
  }

  deleteMessage(messageId: string) {
    const login = this._idIndex.get(messageId);
    if (!login) return;

    const messages = this._messages.get(login);
    if (!messages) return;

    const updatedMessages = messages.filter((m) => m.id !== messageId);
    this._messages.set(login, updatedMessages);
    this._idIndex.delete(messageId);
    this.notify();
  }

  clearUserMessages(login: string) {
    const messages = this._messages.get(login);
    if (messages) {
      for (const message of messages) {
        this._idIndex.delete(message.id);
      }
      this._messages.delete(login);
      this.notify();
    }
  }

  clear() {
    this._messages.clear();
    this._idIndex.clear();
    this.notify();
  }

  setStatus(messageId: string, statusKey: StatusKeys) {
    const login = this._idIndex.get(messageId);
    if (!login) return;

    const messages = this._messages.get(login);
    if (!messages) return;

    const message = messages.find((m) => m.id === messageId);
    if (!message) return;

    if (!message.status) {
      message.status = {};
    }

    message.status[statusKey] = true;
    this.notify();
  }

  editMessage(messageId: string, newText: string) {
    const login = this._idIndex.get(messageId);
    if (!login) return;

    const messages = this._messages.get(login);
    if (!messages) return;

    const message = messages.find((m) => m.id === messageId);
    if (message) {
      message.text = newText;
      if (!message.status) {
        message.status = {};
      }
      message.status.isEdited = true;
      this.notify();
    }
  }

  countUnreadMessages(login: string): number {
    const messages = this.getUserMessages(login);
    return messages.filter(
      (m) => m.from === login && !m.status?.isReaded && !m.status?.isDeleted,
    ).length;
  }

  private notify() {
    for (const listener of this.listeners) listener();
  }
}

const messagesStore = new MessagesStore();
export default messagesStore;
