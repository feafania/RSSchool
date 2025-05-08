import "./chat-input-area.css";

import createInput from "../../../../common/elements/input";
import createButton from "../../../../common/elements/button";
import userList from "../../user-list/user-list";
import { wsClient } from "../../../../../api/websocket";
import chatMessages from "../chat-messages/chat-messages";

class ChatInputArea {
  public chatInput: HTMLTextAreaElement;
  public sendButton: HTMLButtonElement;
  public editingMessageIds: Record<string, string | undefined> = {};

  private messageDrafts: Record<string, string> = {};
  private isEditing: boolean = false;

  constructor() {
    this.chatInput = document.createElement("textarea");
    this.sendButton = document.createElement("button");
  }

  render(): HTMLElement {
    const chatInputArea = document.createElement("form");
    chatInputArea.className = "chat-input-area";
    const chatInputWrapper = this.renderChatInput();
    const sendButton = this.renderSendButton();
    chatInputArea.append(chatInputWrapper, sendButton);
    this.restoreDraft(userList.selectedUser);
    this.updateInputState();
    return chatInputArea;
  }

  public updateInputState() {
    this.chatInput.disabled = !Boolean(userList.selectedUser);
  }

  public saveDraft(login: string | undefined) {
    if (this.chatInput && login) {
      this.messageDrafts[login] = this.chatInput.value;
    }
  }

  public restoreDraft(login: string | undefined) {
    if (this.chatInput && login) {
      this.isEditing = !!(login && this.editingMessageIds[login]);
      this.chatInput.value = this.messageDrafts[login] ?? "";
      this.chatInput.dispatchEvent(new Event("input"));
    }
  }

  public clearDrafts() {
    this.messageDrafts = {};
    this.editingMessageIds = {};
    this.isEditing = false;
  }

  public editMessage(messageId: string, text: string) {
    const login = userList.selectedUser;
    if (!login) return;

    this.chatInput.value = text;
    this.editingMessageIds[login] = messageId;
    this.isEditing = true;
    this.chatInput.focus();
    this.chatInput.dispatchEvent(new Event("input"));
  }

  public cancelEdit() {
    const login = userList.selectedUser;
    if (login && this.editingMessageIds[login]) {
      chatMessages.resetEditState();
      this.editingMessageIds[login] = undefined;
      this.messageDrafts[login] = "";
      this.restoreDraft(login);
    }
  }

  private renderChatInput(): HTMLDivElement {
    const chatInputWrapper = createInput({
      type: "textarea",
      placeholder: "Type your message...",
      class: "chat-input",
    });
    const chatInput = chatInputWrapper.querySelector("textarea");

    if (chatInput) {
      this.chatInput = chatInput;
    }
    this.updateInputHeight();
    this.addInputListeners();
    const cancelButton = this.renderCancelButton();
    if (cancelButton) {
      chatInputWrapper.append(cancelButton);
    }
    return chatInputWrapper;
  }

  private renderSendButton(): HTMLButtonElement {
    this.sendButton = createButton({
      name: "Send",
      class: "send-button",
      disabled: true,
    });
    this.addButtonListeners();
    return this.sendButton;
  }

  private renderCancelButton(): HTMLButtonElement {
    const cancelButton = createButton({
      name: "✕",
      class: "cancel-edit-button",
    });
    cancelButton.title = "Cancel editing";
    cancelButton.style.display = this.isEditing ? "inline-block" : "none";
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.cancelEdit();
    });
    return cancelButton;
  }

  private addInputListeners(): void {
    if (this.chatInput) {
      this.chatInput.addEventListener("input", () => {
        this.onInputChange();
      });
      this.chatInput.addEventListener("change", () => {
        this.onInputChange();
      });
      this.chatInput.form?.addEventListener("reset", () => {
        this.clearDrafts();
        this.updateInputHeight();
        this.updateButtonState();
      });
      this.chatInput.addEventListener("keydown", (event) => {
        this.onKeyPress(event);
      });
    }
  }

  private onInputChange() {
    this.saveDraft(userList.selectedUser);
    this.updateInputHeight();
    this.updateButtonState();
  }

  private addButtonListeners(): void {
    if (this.sendButton) {
      this.sendButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.sendMessage();
      });
    }
  }

  private updateInputHeight() {
    if (!this.chatInput) {
      return;
    }
    const lineHeight =
      Number.parseInt(getComputedStyle(this.chatInput).lineHeight) || 20;
    const paddingY =
      Number.parseInt(getComputedStyle(this.chatInput).paddingTop) +
        Number.parseInt(getComputedStyle(this.chatInput).paddingBottom) || 16;
    const singleLineHeight = lineHeight + paddingY;
    const maxHeight = lineHeight * 3 + paddingY;

    this.chatInput.style.height = "auto"; // reset height
    const newHeight = this.chatInput.scrollHeight;

    if (this.chatInput.value === "") {
      this.chatInput.style.height = `${singleLineHeight}px`;
      this.chatInput.style.overflowY = "hidden";
    } else if (newHeight <= maxHeight) {
      this.chatInput.style.height = `${Math.max(newHeight, singleLineHeight)}px`;
      this.chatInput.style.overflowY = "hidden";
    } else {
      this.chatInput.style.height = `${maxHeight}px`;
      this.chatInput.style.overflowY = "scroll";
    }
  }

  private updateButtonState() {
    if (this.sendButton && this.chatInput) {
      const hasText = this.chatInput.value.trim() !== "";
      const hasRecipient = Boolean(userList.selectedUser);
      this.sendButton.disabled = !(hasText && hasRecipient);
      this.sendButton.textContent = this.isEditing ? "Save" : "Send";
      this.chatInput.disabled = !hasRecipient;

      const cancelButton = this.chatInput.parentElement?.querySelector(
        ".cancel-edit-button",
      ) as HTMLButtonElement;
      if (cancelButton) {
        cancelButton.style.display = this.isEditing ? "inline-block" : "none";
      }
    }
  }

  private onKeyPress(event: KeyboardEvent) {
    const platform =
      navigator.platform?.toLowerCase() || navigator.userAgent.toLowerCase();
    const isMac = /mac|ipod|iphone|ipad/.test(platform);

    const shouldInsertNewLine =
      (event.metaKey && isMac) || (event.ctrlKey && !isMac);
    if (this.sendButton && this.chatInput) {
      if (shouldInsertNewLine && event.key === "Enter") {
        event.preventDefault();
        if (this.chatInput) {
          const cursorPos = this.chatInput.selectionStart;
          this.chatInput.value =
            this.chatInput.value.slice(0, cursorPos) +
            "\n" +
            this.chatInput.value.slice(cursorPos);

          setTimeout(() => {
            this.chatInput.selectionStart = this.chatInput.selectionEnd =
              cursorPos + 1;
          }, 0);

          this.chatInput.dispatchEvent(new Event("input"));
        }
      } else if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.metaKey &&
        !event.ctrlKey
      ) {
        event.preventDefault();
        if (this.sendButton) {
          this.sendButton.click();
        }
      } else if (event.key === "Escape") {
        this.cancelEdit();
      }
    }
  }

  private sendMessage() {
    const text = this.chatInput?.value.trim();
    const recipient = userList.selectedUser;

    if (text && recipient) {
      const editingId = this.editingMessageIds[recipient];
      if (editingId) {
        wsClient.editMessage(editingId, text);
        console.log("Editing message:", editingId, text);
        this.cancelEdit();
        chatMessages.scrollPoint = editingId;
      } else {
        wsClient.sendMessage(recipient, text);
        console.log("Sending message:", text);
      }

      this.chatInput.value = "";
      this.chatInput.dispatchEvent(new Event("input"));
    }

    this.updateButtonState();
  }
}

const chatInputArea = new ChatInputArea();
export default chatInputArea;
