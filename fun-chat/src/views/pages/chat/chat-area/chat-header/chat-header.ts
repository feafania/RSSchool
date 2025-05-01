import "./chat-header.css";
import { UserType } from "../../../../../types/interfaces";

class ChatHeader {
  private headerElement: HTMLDivElement;
  private usernameSpan: HTMLSpanElement;
  private userStatusSpan: HTMLSpanElement;

  constructor() {
    this.headerElement = document.createElement("div");
    this.headerElement.className = "chat-header";

    this.usernameSpan = document.createElement("span");
    this.usernameSpan.className = "chat-username";

    this.userStatusSpan = document.createElement("span");
    this.userStatusSpan.className = "chat-user-status";

    this.reset();

    this.headerElement.append(this.usernameSpan, this.userStatusSpan);
  }

  render(): HTMLElement {
    return this.headerElement;
  }

  reset() {
    this.usernameSpan.textContent = "No user selected";
    this.userStatusSpan.textContent = "";
  }

  setUsername(user: string | UserType) {
    if (typeof user === "string") {
      this.usernameSpan.textContent = user;
      this.userStatusSpan.textContent = "";
    } else {
      this.usernameSpan.textContent = user.login;
      this.userStatusSpan.textContent = user.isLogined ? "online" : "offline";

      if (user.isLogined) {
        this.userStatusSpan.classList.remove("inactive");
      } else {
        this.userStatusSpan.classList.add("inactive");
      }
    }
  }
}

const chatHeader = new ChatHeader();
export default chatHeader;
