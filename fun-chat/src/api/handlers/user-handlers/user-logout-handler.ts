import { UserType, WSRequest } from "../../../types/interfaces";
import { isUserMessage } from "../../../utils/ws-guards";
import { wsClient } from "../../websocket";
import usersStore from "../../../store/users-store";
import authStore from "../../../store/auth-store";
import PageRouter from "../../../router/page-router";
import { PageType } from "../../../types/enum";
import messagesStore from "../../../store/messages-store";
import userList from "../../../views/pages/chat/user-list/user-list";
import chatMessages from "../../../views/pages/chat/chat-area/chat-messages/chat-messages";
import chatInputArea from "../../../views/pages/chat/chat-area/chat-input-area/chat-input-area";
import chatHeader from "../../../views/pages/chat/chat-area/chat-header/chat-header";

export default function userLogoutHandler(response: WSRequest<unknown>) {
  if (response.payload && isUserMessage(response)) {
    const user = response.payload.user as UserType;
    console.log("Logout response:", user);
    if (response.id) {
      authStore.setUser(undefined);
      usersStore.clear();
      messagesStore.clear();
      userList.reset();
      chatMessages.reset();
      chatInputArea.clearDrafts();
      chatHeader.reset();
      PageRouter.navigateTo(PageType.login);

      if (wsClient.socket?.readyState === WebSocket.OPEN) {
        wsClient.close();
        console.log("WebSocket closed after logout");
      }
    } else {
      usersStore.addUser(user);
    }
  } else {
    console.error("Invalid message format: no user in payload");
  }
}
