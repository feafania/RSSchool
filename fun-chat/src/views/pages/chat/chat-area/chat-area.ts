import "./chat-area.css";
import renderChatHeader from "./chat-header/chat-header";
import renderChatMessages from "./chat-messages/chat-messages";
import chatInputArea from "./chat-input-area/chat-input-area";

export default function renderChatArea(): HTMLElement {
  const chatAreaSection = document.createElement("section");
  chatAreaSection.className = "chat-area";

  const chatHeader = renderChatHeader();
  const chatMessages = renderChatMessages();
  const chatInputAreaElement = chatInputArea.render();

  chatAreaSection.append(chatHeader, chatMessages, chatInputAreaElement);
  return chatAreaSection;
}
