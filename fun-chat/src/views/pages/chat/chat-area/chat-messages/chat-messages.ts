import "./chat-messages.css";
import messagesStore from "../../../../../store/messages-store";
import { ChatMessage } from "../../../../../types/interfaces";
import authStore from "../../../../../store/auth-store";
import userList from "../../user-list/user-list";
import createButton from "../../../../common/elements/button";
import { wsClient } from "../../../../../api/websocket";
import chatInputArea from "../chat-input-area/chat-input-area";
import showModalMessage from "../../../../common/elements/modal-window/modal-window";
import { SETTINGS } from "../../../../../constants/settings";

class ChatMessages {
  public isUnreadLine: boolean | undefined = undefined;
  public scrollPoint: string | undefined = undefined;
  private editingMessageId: string | undefined = undefined;
  private chatElement: HTMLElement;
  private unreadLine: HTMLElement | undefined = undefined;
  private messageContainer: HTMLElement;
  private lastRenderedUser: string | undefined = undefined;

  constructor() {
    this.chatElement = document.createElement("div");
    this.chatElement.className = "chat-messages";

    this.messageContainer = document.createElement("div");
    this.messageContainer.className = "chat-messages-container";
    this.chatElement.append(this.messageContainer);

    messagesStore.subscribe(() => this.renderMessages());

    this.chatElement.addEventListener("click", () => this.removeUnreadLine());
    this.messageContainer.addEventListener("scroll", () =>
      this.removeUnreadLine(),
    );
    this.messageContainer.addEventListener("wheel", () =>
      this.removeUnreadLine(),
    );
    this.messageContainer.addEventListener("touchstart", () =>
      this.removeUnreadLine(),
    );
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatElement.scrollTop = this.chatElement.scrollHeight;
    }, 0);
  }

  scrollToUnreadLine() {
    if (this.unreadLine) {
      setTimeout(() => {
        this.unreadLine?.scrollIntoView({ behavior: "auto" }); // scrolls to make unreadLine visible
      }, 0);
    }
  }

  render(): HTMLElement {
    this.renderMessages();
    return this.chatElement;
  }

  public reset() {
    this.unreadLine = undefined;
    this.isUnreadLine = undefined;
    this.lastRenderedUser = undefined;
  }

  public startEditing(messageId: string) {
    this.editingMessageId = messageId;
    const messageElement = this.messageContainer.querySelector(
      `[data-message-id="${messageId}"]`,
    );

    if (!messageElement) return;

    const oldNotice = messageElement.querySelector(".editing-notice");
    if (!oldNotice) {
      const editingNotice = this.renderEditNotice();

      const actions = messageElement.querySelector(".message-actions");
      if (actions) {
        actions.before(editingNotice);
      } else {
        messageElement.append(editingNotice);
      }
    }
  }

  public resetEditState() {
    const messageElement = this.messageContainer.querySelector(
      `[data-message-id="${this.editingMessageId}"]`,
    );

    if (!messageElement) return;

    const oldNotice = messageElement.querySelector(".editing-notice");
    if (oldNotice) {
      oldNotice.remove();
    }
    this.editingMessageId = undefined;
  }

  private renderMessages() {
    const selectedUser = userList.selectedUser;
    const userChanged = selectedUser !== this.lastRenderedUser;
    this.lastRenderedUser = selectedUser;
    if (userChanged) this.isUnreadLine = undefined;

    this.messageContainer.innerHTML = "";

    if (!selectedUser) {
      this.renderNotice("chat-notice", SETTINGS.label.chat.chatNotice);
      return;
    }
    const messages = [...messagesStore.getUserMessages(selectedUser)].sort(
      (a, b) =>
        new Date(a.datetime ?? 0).getTime() -
        new Date(b.datetime ?? 0).getTime(),
    );
    if (messages.length === 0) {
      this.renderNotice("chat-start", SETTINGS.label.chat.chatStart);
      return;
    }
    this.messageContainer.style.justifyContent = "flex-end";
    this.messageContainer.style.height = "auto";

    this.editingMessageId = chatInputArea.editingMessageIds[selectedUser];
    this.setUnreadLineOnMessages(messages);
    const lastMessage = messages.at(-1);
    const isFromSelectedUser = lastMessage?.from === selectedUser;

    if (!isFromSelectedUser) {
      this.removeUnreadLine();
    }
    this.scrollToView(isFromSelectedUser);
  }

  private renderNotice(className: string, text: string) {
    const notice = document.createElement("div");
    notice.className = className;
    notice.textContent = text;
    this.messageContainer.append(notice);
    this.messageContainer.style.justifyContent = "center";
    this.messageContainer.style.height = "100%";
  }

  private readMessages(): void {
    const selectedUser = userList.selectedUser;
    if (selectedUser) {
      const messages = messagesStore.getUserMessages(selectedUser);
      const unreadMessages = messages.filter(
        (m) =>
          !m.status?.isReaded &&
          m.from !== authStore.user?.login &&
          !m.status?.isDeleted,
      );

      for (const message of unreadMessages) {
        wsClient.readMessage(message.id);
      }
    }
  }

  private removeUnreadLine() {
    if (this.unreadLine) {
      this.readMessages();
      this.unreadLine.remove();
      this.unreadLine = undefined;
    }
  }

  private scrollToView(isFromSelectedUser: boolean): void {
    if (this.editingMessageId) {
      this.scrollToMessage(this.editingMessageId);
    } else if (this.scrollPoint) {
      this.scrollToMessage(this.scrollPoint);
      this.scrollPoint = undefined;
    } else if (this.isUnreadLine && isFromSelectedUser) {
      this.scrollToUnreadLine();
    } else {
      this.scrollToBottom();
      this.readMessages();
    }
  }

  private scrollToMessage(messageID: string): void {
    const element = this.messageContainer.querySelector(
      `[data-message-id="${messageID}"]`,
    );
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "auto", block: "center" });
      }, 0);
    }
  }

  private createMessageElement(message: ChatMessage): HTMLElement {
    const isCurrentUser = message.from === authStore.user?.login;
    const messageElement = document.createElement("div");
    messageElement.className = `chat-message ${isCurrentUser ? "from-me" : "from-user"}`;
    messageElement.dataset.messageId = message.id;

    const messageHeader = this.createMessageHeader(message);

    const messageBody = document.createElement("div");
    messageBody.className = "message-body";
    messageBody.textContent = message.text ?? "";

    messageElement.append(messageHeader, messageBody);
    if (isCurrentUser || message.status?.isEdited) {
      const statusLine = document.createElement("div");
      statusLine.className = "message-status-line";
      if (isCurrentUser) {
        const status = this.renderStatus(message);
        status.classList.add("status-left");
        statusLine.append(status);
      }
      if (message.status?.isEdited) {
        const editedMark = document.createElement("div");
        editedMark.className = "message-edited status-right";
        statusLine.append(editedMark);
      }
      messageElement.append(statusLine);
    }
    if (isCurrentUser && message.id === this.editingMessageId) {
      const editingNotice = this.renderEditNotice();
      messageElement.append(editingNotice);
    }
    if (isCurrentUser) {
      messageElement.append(this.renderActions(message));
    }

    return messageElement;
  }

  private createMessageHeader(message: ChatMessage): HTMLElement {
    const messageHeader = document.createElement("div");
    messageHeader.className = "message-header";

    const senderElement = document.createElement("span");
    senderElement.className = "message-sender";
    senderElement.textContent =
      message.from === authStore.user?.login ? "you" : (message.from ?? "");

    const datetimeElement = document.createElement("span");
    datetimeElement.className = "message-datetime";
    datetimeElement.textContent = message.datetime
      ? new Date(message.datetime).toLocaleString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "";

    messageHeader.append(senderElement, datetimeElement);
    return messageHeader;
  }

  private renderStatus(message: ChatMessage): HTMLElement {
    const status = document.createElement("div");
    status.className = "message-status";
    if (message.status?.isReaded) {
      status.textContent = "Read";
    } else if (message.status?.isDelivered) {
      status.textContent = "Delivered";
    } else {
      status.textContent = "Sent";
    }
    return status;
  }

  private renderActions(message: ChatMessage): HTMLElement {
    const actions = document.createElement("div");
    actions.className = "message-actions";

    const editButton = createButton(
      { name: "✏️", class: "chat-button" },
      () => {
        this.resetEditState();
        chatInputArea.editMessage(message.id, message.text!);
        this.startEditing(message.id);
      },
    );

    const deleteButton = createButton(
      { name: "🗑️", class: "chat-button" },
      () => {
        showModalMessage(SETTINGS.label.chat.deleteMessage, {
          showCancel: true,
          onOk: () => {
            const selectedUser = userList.selectedUser;
            if (this.editingMessageId === message.id) {
              this.resetEditState();
            }
            if (
              selectedUser &&
              chatInputArea.editingMessageIds[selectedUser] === message.id
            ) {
              chatInputArea.cancelEdit();
            }
            wsClient.deleteMessage(message.id);
          },
        });
      },
    );

    actions.append(editButton);
    actions.append(deleteButton);

    return actions;
  }

  private renderEditNotice() {
    const editingNotice = document.createElement("div");
    editingNotice.className = "editing-notice";
    editingNotice.textContent = SETTINGS.label.chat.editMessage;
    return editingNotice;
  }

  private setUnreadLineOnMessages(messages: ChatMessage[]) {
    let addedUnreadLine = false;
    for (const message of messages) {
      const isUnread =
        !message.status?.isReaded && message.from !== authStore.user?.login;

      if (
        (this.isUnreadLine === undefined || this.isUnreadLine) &&
        isUnread &&
        !addedUnreadLine
      ) {
        this.unreadLine = document.createElement("div");
        this.unreadLine.className = "chat-unread-line";
        this.unreadLine.textContent = SETTINGS.label.chat.unreadMessages;
        this.messageContainer.append(this.unreadLine);
        addedUnreadLine = true;
      }
      this.messageContainer.append(this.createMessageElement(message));
    }
    this.isUnreadLine = addedUnreadLine;
  }
}

const chatMessages = new ChatMessages();
export default chatMessages;
