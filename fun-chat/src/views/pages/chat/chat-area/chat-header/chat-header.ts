import "./chat-header.css";

export default function renderChatHeader(): HTMLElement {
  const chatHeader = document.createElement("div");
  chatHeader.className = "chat-header";

  const chatUsername = document.createElement("span");
  chatUsername.className = "chat-username";
  chatUsername.textContent = "No user selected";

  chatHeader.append(chatUsername);

  return chatHeader;
}
