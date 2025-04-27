import authStore from "../store/auth-store";
import { API_SETTINGS } from "../constants";
import { MessageVariant, PageType } from "../types/enum";
import { UserType, WSRequest } from "../types/interfaces";
import { MessageHandlerType } from "../types/types";
import { saveState, wait } from "../utils/helpers";
import PageRouter from "../router/page-router";
import showModalMessage from "../views/common/elements/modal-window/modal-window";
import {
  hideReconnectOverlay,
  showReconnectOverlay,
} from "../views/common/elements/spinner/spinner";

import errorHandler from "./handlers/error-handler";
import editMessageHandler from "./handlers/message-handlers/edit-message-handler";
import deleteMessageHandler from "./handlers/message-handlers/delete-message-handler";
import deliveryStatusHandler from "./handlers/message-handlers/delivery-status-handler";
import messageHistoryHandler from "./handlers/message-handlers/message-history-handler";
import readStatusHandler from "./handlers/message-handlers/read-status-handler";
import receiveMessageHandler from "./handlers/message-handlers/receive-message-handler";
import userListHandler from "./handlers/user-handlers/user-list-handler";
import userLoginHandler from "./handlers/user-handlers/user-login-handler";
import userLogoutHandler from "./handlers/user-handlers/user-logout-handler";

export class WebSocketClient {
  public socket: WebSocket | undefined;
  readonly messageHandlers: MessageHandlerType;
  private onOpenBound = this.onOpen.bind(this);
  private onMessageBound = this.onMessage.bind(this);
  private onErrorBound = this.onError.bind(this);
  private onCloseBound = this.onClose.bind(this);

  private reconnectInterval: number = 1000;
  private maxReconnectAttempts: number = 100;
  private maxSendingAttempts: number = 20;
  private reconnectAttempts: number = 0;
  public isLoggingOut: boolean;

  constructor() {
    this.socket = undefined;
    this.isLoggingOut = false;
    this.messageHandlers = {
      [MessageVariant.USER_LOGIN]: userLoginHandler,
      [MessageVariant.USER_LOGOUT]: userLogoutHandler,
      [MessageVariant.USER_EXTERNAL_LOGIN]: userLoginHandler,
      [MessageVariant.USER_EXTERNAL_LOGOUT]: userLogoutHandler,
      [MessageVariant.USER_ACTIVE]: userListHandler,
      [MessageVariant.USER_INACTIVE]: userListHandler,
      [MessageVariant.MSG_SEND]: receiveMessageHandler,
      [MessageVariant.MSG_FROM_USER]: messageHistoryHandler,
      [MessageVariant.MSG_DELIVER]: deliveryStatusHandler,
      [MessageVariant.MSG_READ]: readStatusHandler,
      [MessageVariant.MSG_DELETE]: deleteMessageHandler,
      [MessageVariant.MSG_EDIT]: editMessageHandler,
      [MessageVariant.ERROR]: errorHandler,
    };
  }

  async connect() {
    if (globalThis.WebSocket === undefined) {
      console.log("sockets not supported");
      return false;
    }
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
    try {
      this.socket = new WebSocket(
        `${API_SETTINGS.BASE_URL}:${API_SETTINGS.PORT}`,
      );
      this.socket.addEventListener("open", this.onOpenBound);
      this.socket.addEventListener("message", this.onMessageBound);
      this.socket.addEventListener("close", this.onCloseBound);
      this.socket.addEventListener("error", this.onErrorBound);
    } catch (error) {
      console.error("WebSocket connection error:", error);
    }
  }

  onOpen() {
    console.info("WebSocket connected");
    this.reconnectAttempts = 0;
    this.isLoggingOut = false;
    hideReconnectOverlay();

    const savedUser = authStore.user;
    if (savedUser?.login && savedUser?.password) {
      console.info("Re-authenticating after reconnect...");
      setTimeout(() => {
        this.login(savedUser);
      }, this.reconnectInterval);
    }
  }

  onMessage(event: MessageEvent) {
    try {
      if (typeof event.data === "string") {
        const message = JSON.parse(event.data) as WSRequest;
        const handler = this.messageHandlers[message.type];
        if (handler) {
          handler(message);
        }
      }
    } catch (error) {
      console.error("Failed to process WebSocket message:", error);
    }
  }

  onError() {
    console.error("WebSocket connection error");
  }

  async onClose(event: CloseEvent) {
    if (this.socket) {
      this.socket.removeEventListener("open", this.onOpenBound);
      this.socket.removeEventListener("message", this.onMessageBound);
      this.socket.removeEventListener("close", this.onCloseBound);
      this.socket.removeEventListener("error", this.onErrorBound);
    }
    if (event.code === 1000 && event.wasClean) {
      console.log("WebSocket disconnected normally.");
    } else {
      if (navigator.onLine) {
        console.log("WebSocket was suddenly closed", event.code);

        showReconnectOverlay();
        // if (this.reconnectAttempts < this.maxReconnectAttempts) {
        console.log(
          `Reconnecting in ${this.reconnectInterval / 1000} seconds...`,
        );
        await wait(this.reconnectInterval);
        this.reconnectAttempts += 1;
        await this.connect();
        // } else {
        //   console.error("Max reconnect attempts reached.");
        //   showModalMessage("Unable to reconnect to the server. Please try again later.");
        // }
      } else {
        showModalMessage(
          "You are offline. Please connect to the Internet and try again.",
        );
      }
    }
  }

  close() {
    try {
      authStore.setUser(undefined);
      if (this.socket) {
        this.socket.close(1000, "Normal closure");
        this.socket = undefined;
      }
      PageRouter.navigateTo(PageType.login);
    } catch (error) {
      console.error("WebSocket closing error:", error);
    }
  }

  /* ------- Requests ------- */

  async send<T>(data: WSRequest<T>, attempt = 0) {
    if (!this.socket) {
      await this.connect();
    }
    if (!this.socket) {
      console.error("WebSocket is not initialized");
      return;
    }
    try {
      if (
        this.socket.readyState === WebSocket.CONNECTING &&
        attempt <= this.maxSendingAttempts
      ) {
        console.log(
          "WebSocket is still connecting, waiting...",
          this.socket.readyState,
        );
        await wait(this.reconnectInterval);
        await this.send(data, attempt + 1);
        return;
      }

      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(data));
        console.debug("Sending WS message:", data);
      } else {
        console.error("WebSocket is not opened");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error sending WebSocket message:", error);
        throw new Error(error.message);
      } else {
        console.error("Unknown error:", error);
        throw new Error(
          "Unknown error occurred while sending WebSocket message",
        );
      }
    }
  }

  async login(user: UserType) {
    const login = user.login ?? "";
    const password = user.password ?? "";
    this.isLoggingOut = false;
    if (login && password) {
      await this.send({
        id: `login_${Date.now()}`,
        type: MessageVariant.USER_LOGIN,
        payload: { user: { login, password } },
      });
      saveState({ key: "user", value: JSON.stringify(user) });
    } else {
      showModalMessage("Missing login or password.");
      console.error("Login or password is missing.");
    }
  }

  async logout(user: UserType) {
    const login = user.login ?? "";
    const password = user.password ?? "";
    this.isLoggingOut = true;
    if (login && password) {
      this.send({
        id: `logout_${Date.now()}`,
        type: MessageVariant.USER_LOGOUT,
        payload: { user: { login, password } },
      });
    } else {
      showModalMessage("Missing login or password.");
      console.error("Login or password is missing.");
    }
  }

  async getActiveUsers() {
    this.send<null>({
      id: `active_${Date.now()}`,
      type: MessageVariant.USER_ACTIVE,
    });
  }

  async getInactiveUsers() {
    this.send<null>({
      id: `inactive_${Date.now()}`,
      type: MessageVariant.USER_INACTIVE,
    });
  }

  async sendMessage(to: string, text: string) {
    this.send({
      id: `msg_send_${Date.now()}`,
      type: MessageVariant.MSG_SEND,
      payload: { message: { to, text } },
    });
  }

  async getMessageHistory(login: string) {
    this.send({
      id: `msg_history_${Date.now()}`,
      type: MessageVariant.MSG_FROM_USER,
      payload: { user: { login } },
    });
  }

  async readMessage(messageId: string) {
    this.send({
      id: `msg_read_${Date.now()}`,
      type: MessageVariant.MSG_READ,
      payload: { message: { id: messageId } },
    });
  }

  async deleteMessage(messageId: string) {
    this.send({
      id: `msg_delete_${Date.now()}`,
      type: MessageVariant.MSG_DELETE,
      payload: { message: { id: messageId } },
    });
  }

  async editMessage(messageId: string, text: string) {
    this.send({
      id: `msg_edit_${Date.now()}`,
      type: MessageVariant.MSG_EDIT,
      payload: { message: { id: messageId, text } },
    });
  }
}

export const wsClient = new WebSocketClient();
