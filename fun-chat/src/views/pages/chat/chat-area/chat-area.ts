import "./chat-area.css";

import chatInputArea from "./chat-input-area/chat-input-area";
import chatHeader from "./chat-header/chat-header";
import chatMessages from "./chat-messages/chat-messages";

export default function renderChatArea(): HTMLElement {
  const chatAreaSection = document.createElement("section");
  chatAreaSection.className = "chat-area";

  chatAreaSection.append(
    chatHeader.render(),
    chatMessages.render(),
    chatInputArea.render(),
  );
  return chatAreaSection;
}
