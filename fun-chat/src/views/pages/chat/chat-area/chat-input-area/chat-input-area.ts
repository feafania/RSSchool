import "./chat-input-area.css";

import createInput from "../../../../common/elements/input";
import createButton from "../../../../common/elements/button";

class ChatInputArea {
  private chatInput: HTMLTextAreaElement;
  private sendButton: HTMLButtonElement;

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
    return chatInputArea;
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
    this.addInputListerners();
    return chatInputWrapper;
  }

  private renderSendButton(): HTMLButtonElement {
    const sendButton = createButton(
      {
        name: "Send",
        class: "send-button",
      },
      // disabled: true,
    );
    this.addButtonListerners();
    return sendButton;
  }

  private addInputListerners(): void {
    if (this.chatInput) {
      this.chatInput.addEventListener("input", () => {
        this.updateInputHeight();
      });
      this.chatInput.addEventListener("change", () => {
        this.updateInputHeight();
      });
      this.chatInput.form?.addEventListener("reset", () => {
        this.updateInputHeight();
      });
      this.chatInput.addEventListener("keydown", (event) => {
        this.onKeyPress(event);
      });
    }
  }

  private addButtonListerners(): void {
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
      }
    }
  }

  private sendMessage() {
    if (this.chatInput?.value.trim()) {
      console.log("Sending message:", this.chatInput.value);
      this.chatInput.value = "";
      this.chatInput.dispatchEvent(new Event("input"));
    }
  }
}

const chatInputArea = new ChatInputArea();
export default chatInputArea;
