import "./chat.css";
import renderChatArea from "./chat-area/chat-area";
import userList from "./user-list/user-list";

const ChatView = {
  renderChat() {
    const container = document.createElement("section");
    container.id = "chat";
    container.className = "view chat-view";

    const userListElement = userList.render();
    const chatAreaSection = renderChatArea();
    container.append(userListElement, chatAreaSection);
    return container;
  },
};

export default ChatView;
